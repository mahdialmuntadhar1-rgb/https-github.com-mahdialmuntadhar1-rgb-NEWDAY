import { supabase } from './supabase';
import * as mock from './mockData';
import { Business, Post, Story, Event, Deal, BusinessPostcard, Governorate, User, Role } from '../types';

const GOV_MAP: Record<string, Governorate> = {
  'baghdad': 'Baghdad',
  'erbil': 'Erbil',
  'basra': 'Basra',
  'nineveh': 'Nineveh',
  'duhok': 'Duhok',
  'sulaymaniyah': 'Sulaymaniyah',
  'kirkuk': 'Kirkuk',
  'diyala': 'Diyala',
  'anbar': 'Anbar',
  'babil': 'Babil',
  'karbala': 'Karbala',
  'najaf': 'Najaf',
  'qadisiyah': 'Qadisiyah',
  'muthanna': 'Muthanna',
  'dhi_qar': 'Dhi Qar',
  'maysan': 'Maysan',
  'wasit': 'Wasit',
  'salah_al_din': 'Salah al-Din'
};

const normalizeGov = (gov: Governorate): string => {
  return gov.toLowerCase().replace(/\s+/g, '_');
};

const denormalizeGov = (normalizedGov: string): Governorate => {
  return GOV_MAP[normalizedGov] || 'Baghdad';
};

const mapData = <T extends { governorate: any }>(data: any[]): T[] => {
  return data.map(item => ({
    ...item,
    governorate: denormalizeGov(item.governorate)
  })) as T[];
};

export const api = {
  getBusinesses: async (gov: Governorate, featuredOnly: boolean = false): Promise<Business[]> => {
    const normalizedGov = normalizeGov(gov);
    try {
      let query = supabase.from('businesses').select('*').eq('governorate', normalizedGov);
      if (featuredOnly) query = query.eq('featured', true);
      
      const { data, error } = await query;
      if (error || !data || data.length === 0) return mock.mockBusinesses(gov).filter(b => !featuredOnly || b.featured);
      return mapData<Business>(data);
    } catch (e) {
      return mock.mockBusinesses(gov).filter(b => !featuredOnly || b.featured);
    }
  },

  getPosts: async (gov: Governorate): Promise<Post[]> => {
    const normalizedGov = normalizeGov(gov);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('governorate', normalizedGov)
        .order('createdAt', { ascending: false });
        
      if (error || !data || data.length === 0) return mock.mockPosts(gov);
      return mapData<Post>(data);
    } catch (e) {
      return mock.mockPosts(gov);
    }
  },

  getStories: async (gov: Governorate): Promise<Story[]> => {
    const normalizedGov = normalizeGov(gov);
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .eq('governorate', normalizedGov);
        
      if (error || !data || data.length === 0) return mock.mockStories(gov);
      return mapData<Story>(data);
    } catch (e) {
      return mock.mockStories(gov);
    }
  },

  getEvents: async (gov: Governorate): Promise<Event[]> => {
    const normalizedGov = normalizeGov(gov);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('governorate', normalizedGov);
        
      if (error || !data || data.length === 0) return mock.mockEvents(gov);
      return mapData<Event>(data);
    } catch (e) {
      return mock.mockEvents(gov);
    }
  },

  getDeals: async (gov: Governorate): Promise<Deal[]> => {
    const normalizedGov = normalizeGov(gov);
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('governorate', normalizedGov);
        
      if (error || !data || data.length === 0) return mock.mockDeals(gov);
      return mapData<Deal>(data);
    } catch (e) {
      return mock.mockDeals(gov);
    }
  },

  getPostcards: async (gov: Governorate): Promise<BusinessPostcard[]> => {
    const normalizedGov = normalizeGov(gov);
    try {
      const { data, error } = await supabase
        .from('postcards')
        .select('*')
        .eq('governorate', normalizedGov);
        
      if (error || !data || data.length === 0) return mock.mockPostcards(gov);
      return mapData<BusinessPostcard>(data);
    } catch (e) {
      return mock.mockPostcards(gov);
    }
  },

  createPost: async (post: Partial<Post>): Promise<Post | null> => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{
          ...post,
          governorate: post.governorate ? normalizeGov(post.governorate) : undefined
        }])
        .select()
        .single();
        
      if (error) throw error;
      return {
        ...data,
        governorate: denormalizeGov(data.governorate)
      } as Post;
    } catch (e) {
      console.error('Error creating post:', e);
      return null;
    }
  },

  getOrCreateProfile: async (supabaseUser: any, pendingRole: Role): Promise<User> => {
    const defaultUser: User = {
      id: supabaseUser.id,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
      email: supabaseUser.email || '',
      avatar: supabaseUser.user_metadata?.avatar_url || `https://picsum.photos/seed/${supabaseUser.id}/100`,
      role: pendingRole
    };

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        const isAdmin = supabaseUser.email === 'safaribosafar@gmail.com';
        const role = isAdmin ? 'admin' : pendingRole;
        
        const { data: newProfile, error: createError } = await supabase
          .from('users')
          .insert([{
            id: supabaseUser.id,
            name: defaultUser.name,
            email: defaultUser.email,
            avatar: defaultUser.avatar,
            role: role,
            businessId: role === 'owner' ? `bus_${supabaseUser.id}` : null
          }])
          .select()
          .single();

        if (createError) throw createError;
        return newProfile as User;
      }

      if (error) throw error;
      return data as User;
    } catch (e) {
      console.error('Error getting/creating profile:', e);
      return defaultUser;
    }
  },

  subscribeToPosts: (gov: Governorate, onNewPost: (post: Post) => void) => {
    const normalizedGov = normalizeGov(gov);
    const channel = supabase
      .channel(`public:posts:governorate=${normalizedGov}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'posts',
        filter: `governorate=eq.${normalizedGov}`
      }, (payload) => {
        const newPost = {
          ...payload.new,
          governorate: denormalizeGov(payload.new.governorate)
        } as Post;
        onNewPost(newPost);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};
