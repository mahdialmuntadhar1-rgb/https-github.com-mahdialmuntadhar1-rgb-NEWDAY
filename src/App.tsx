import React, { useState, useEffect, useCallback } from 'react';
import { TranslationProvider, useTranslation } from './context/TranslationContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { Categories } from './components/Categories';
import { StoriesRing } from './components/StoriesRing';
import { FeaturedBusinesses } from './components/FeaturedBusinesses';
import { PersonalizedEvents } from './components/PersonalizedEvents';
import { DealsMarketplace } from './components/DealsMarketplace';
import { BusinessPostcardsSection } from './components/BusinessPostcardsSection';
import { SocialFeed } from './components/SocialFeed';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { AICityGuide } from './components/AICityGuide';
import { AccessibilityPanel } from './components/AccessibilityPanel';
import { BusinessDirectory } from './components/BusinessDirectory';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { BusinessDetailModal, EventDetailModal, DealModal, StoryViewer, SubcategoryModal, PostcardModal } from './components/Modals';
import { api } from './services/api';
import { supabase } from './services/supabase';
import { Governorate, User, Business, Post, Story, Event, Deal, BusinessPostcard, Role, Category } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

const AppContent: React.FC = () => {
  const { t } = useTranslation();
  
  // App State
  const [governorate, setGovernorate] = useState<Governorate>('Baghdad');
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<'home' | 'dashboard' | 'listing'>('home');
  const [listingFilter, setListingFilter] = useState<{ category: string | null; subcategory: string | null }>({ 
    category: null, 
    subcategory: null 
  });
  const [highContrast, setHighContrast] = useState(false);
  
  // Data State
  const [stories, setStories] = useState<Story[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [postcards, setPostcards] = useState<BusinessPostcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  
  // UI State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedPostcard, setSelectedPostcard] = useState<BusinessPostcard | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const isLoggedIn = !!user;

  // Navigation Helper
  const navigateTo = useCallback((newPage: 'home' | 'dashboard' | 'listing', filter?: { category: string | null; subcategory: string | null }) => {
    setPage(newPage);
    if (filter) {
      setListingFilter(filter);
    } else if (newPage !== 'listing') {
      setListingFilter({ category: null, subcategory: null });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Bootstrap Auth
  useEffect(() => {
    if (!supabase) return;

    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const pendingRole = sessionStorage.getItem('pending_role') as Role || 'user';
        const profile = await api.getOrCreateProfile(session.user, pendingRole);
        setUser(profile);
        // Clear pending role after successful profile load
        sessionStorage.removeItem('pending_role');
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const pendingRole = sessionStorage.getItem('pending_role') as Role || 'user';
        const profile = await api.getOrCreateProfile(session.user, pendingRole);
        setUser(profile);
        sessionStorage.removeItem('pending_role');
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [s, p, b, e, d, pc] = await Promise.all([
        api.getStories(governorate),
        api.getPosts(governorate),
        api.getBusinesses(governorate, false),
        api.getEvents(governorate),
        api.getDeals(governorate),
        api.getPostcards(governorate)
      ]);
      setStories(s);
      setPosts(p);
      setBusinesses(b);
      setEvents(e);
      setDeals(d);
      setPostcards(pc);
      setHasMorePosts(p.length >= 5);
      setIsLoading(false);
    };

    fetchData();

    const unsubscribe = api.subscribeToPosts(governorate, (newPost) => {
      setPosts(prev => [newPost, ...prev]);
    });

    return () => unsubscribe();
  }, [governorate]);

  const handleLoadMorePosts = async () => {
    if (isLoadingPosts || !hasMorePosts) return;
    setIsLoadingPosts(true);
    const morePosts = await api.getPosts(governorate);
    if (morePosts.length === 0) {
      setHasMorePosts(false);
    } else {
      setPosts(prev => [...prev, ...morePosts]);
    }
    setIsLoadingPosts(false);
  };

  // High Contrast Effect
  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  }, [highContrast]);

  const handleLogin = (role: Role) => {
    sessionStorage.setItem('pending_role', role);
    if (supabase) {
      supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.href }
      });
    } else {
      // Mock login
      setUser({
        id: 'mock-id',
        name: 'Mock User',
        email: 'mock@example.com',
        role: role,
        avatar: 'https://picsum.photos/seed/mock/100'
      });
      setShowAuthModal(false);
      toast.success(t('welcomeBack'));
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    navigateTo('home');
    toast.info(t('loggedOut'));
  };

  const handleCategoryClick = (category: Category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setSelectedCategory(category);
    } else {
      navigateTo('listing', { category: category.id, subcategory: null });
    }
  };

  const handleCreatePostRequest = () => {
    if (!user) {
      sessionStorage.setItem('pending_role', 'owner');
      setShowAuthModal(true);
      toast.info(t('ownerSignupPrompt'));
    } else if (user.role === 'owner' || user.role === 'admin') {
      navigateTo('dashboard');
    } else {
      toast.error(t('ownerOnly'));
    }
  };

  const handleCreatePost = async (content: string, image?: string) => {
    if (!user) return;
    const newPost = await api.createPost({
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      content,
      image,
      governorate
    });
    if (newPost) {
      setPosts(prev => [newPost, ...prev]);
      toast.success(t('postCreated'));
    }
  };

  const getActiveTab = () => {
    if (page === 'home') return 'home';
    if (page === 'listing') return 'search';
    if (page === 'dashboard') return 'dashboard';
    return 'home';
  };

  const handleMobileTabChange = (tab: string) => {
    if (tab === 'home') navigateTo('home');
    if (tab === 'search') navigateTo('listing');
    if (tab === 'dashboard') navigateTo('dashboard');
    if (tab === 'create') handleCreatePostRequest();
    if (tab === 'profile') {
      if (user) navigateTo('dashboard');
      else setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white pb-20 md:pb-0">
      <Header 
        selectedGovernorate={governorate}
        setSelectedGovernorate={setGovernorate}
        user={user}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        navigateTo={navigateTo}
      />

      <AnimatePresence mode="wait">
        {page === 'home' ? (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection 
              onExplore={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
              onViewBusinesses={() => navigateTo('listing')}
              onTrending={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}
              onJoinOwner={() => {
                sessionStorage.setItem('pending_role', 'owner');
                setShowAuthModal(true);
              }}
            />

            <div id="categories">
              <Categories onCategoryClick={handleCategoryClick} />
            </div>

            <div className="py-8">
              <StoriesRing stories={stories} onStoryClick={setSelectedStory} />
            </div>

            <div id="featured">
              <FeaturedBusinesses 
                businesses={businesses.filter(b => b.featured)} 
                onBusinessClick={setSelectedBusiness}
                isLoading={isLoading}
              />
            </div>

            <PersonalizedEvents events={events} onEventClick={setSelectedEvent} />

            <AICityGuide governorate={governorate} />

            <DealsMarketplace deals={deals} onClaimDeal={setSelectedDeal} />

            <BusinessPostcardsSection postcards={postcards} onPostcardClick={setSelectedPostcard} />

            <SocialFeed 
              posts={posts} 
              user={user} 
              onCreatePost={handleCreatePostRequest} 
              onLoadMore={handleLoadMorePosts}
              hasMore={hasMorePosts}
              isLoading={isLoading || isLoadingPosts}
            />
          </motion.main>
        ) : page === 'dashboard' && user ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Dashboard 
              user={user} 
              onCreatePost={handleCreatePost}
              userPosts={posts.filter(p => p.userId === user.id)}
              onBack={() => navigateTo('home')}
            />
          </motion.div>
        ) : page === 'listing' ? (
          <motion.div
            key="listing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BusinessDirectory 
              businesses={businesses}
              onBusinessClick={setSelectedBusiness}
              onBack={() => navigateTo('home')}
              selectedGovernorate={governorate}
              initialCategory={listingFilter.category}
              initialSubcategory={listingFilter.subcategory}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        onLogin={handleLogin} 
      />

      <BusinessDetailModal business={selectedBusiness} onClose={() => setSelectedBusiness(null)} />
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <DealModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
      <SubcategoryModal 
        category={selectedCategory} 
        onClose={() => setSelectedCategory(null)} 
        onSelect={(sub) => {
          const catId = selectedCategory?.id || null;
          setSelectedCategory(null);
          navigateTo('listing', { category: catId, subcategory: sub });
        }} 
      />
      <PostcardModal postcard={selectedPostcard} onClose={() => setSelectedPostcard(null)} />
      
      {selectedStory && <StoryViewer story={selectedStory} onClose={() => setSelectedStory(null)} />}

      <AccessibilityPanel highContrast={highContrast} setHighContrast={setHighContrast} />

      <Footer />

      <MobileNav 
        activeTab={getActiveTab() as any}
        onTabChange={handleMobileTabChange as any}
      />
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <TranslationProvider>
        <AppContent />
      </TranslationProvider>
    </ErrorBoundary>
  );
}

