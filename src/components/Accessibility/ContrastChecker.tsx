import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface Color {
  r: number;
  g: number;
  b: number;
}

const hexToRgb = (hex: string): Color => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const getLuminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const getContrastRatio = (color1: Color, color2: Color): number => {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const ContrastChecker: React.FC = () => {
  const [fg, setFg] = useState({ r: 255, g: 255, b: 255 });
  const [bg, setBg] = useState({ r: 255, g: 99, b: 33 }); // Neon Orange

  const contrastRatio = useMemo(() => getContrastRatio(fg, bg), [fg, bg]);

  const getRating = (ratio: number) => {
    if (ratio >= 7) return { label: 'AAA', color: 'text-green-400', icon: CheckCircle2 };
    if (ratio >= 4.5) return { label: 'AA', color: 'text-blue-400', icon: CheckCircle2 };
    if (ratio >= 3) return { label: 'Large Text Only', color: 'text-yellow-400', icon: AlertCircle };
    return { label: 'Fail', color: 'text-red-400', icon: XCircle };
  };

  const rating = getRating(contrastRatio);

  return (
    <div className="space-y-8 p-6 bg-white/5 rounded-3xl border border-white/10">
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-widest text-white/40">Contrast Checker</h4>
        <div className="flex items-center justify-between">
          <div className="text-3xl font-black text-white tracking-tighter">
            {contrastRatio.toFixed(2)}:1
          </div>
          <div className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest ${rating.color}`}>
            <rating.icon className="w-4 h-4" />
            {rating.label}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div 
        className="h-24 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-lg"
        style={{ backgroundColor: rgbToHex(bg.r, bg.g, bg.b) }}
      >
        <span 
          className="text-xl font-black uppercase tracking-widest"
          style={{ color: rgbToHex(fg.r, fg.g, fg.b) }}
        >
          Preview Text
        </span>
      </div>

      {/* Sliders */}
      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Foreground (Text)</label>
          <div className="space-y-2">
            <input 
              type="range" min="0" max="255" value={fg.r} 
              onChange={(e) => setFg({ ...fg, r: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500" 
            />
            <input 
              type="range" min="0" max="255" value={fg.g} 
              onChange={(e) => setFg({ ...fg, g: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500" 
            />
            <input 
              type="range" min="0" max="255" value={fg.b} 
              onChange={(e) => setFg({ ...fg, b: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" 
            />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Background</label>
          <div className="space-y-2">
            <input 
              type="range" min="0" max="255" value={bg.r} 
              onChange={(e) => setBg({ ...bg, r: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-500" 
            />
            <input 
              type="range" min="0" max="255" value={bg.g} 
              onChange={(e) => setBg({ ...bg, g: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-green-500" 
            />
            <input 
              type="range" min="0" max="255" value={bg.b} 
              onChange={(e) => setBg({ ...bg, b: parseInt(e.target.value) })}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};
