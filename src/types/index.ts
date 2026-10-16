export type ToolCategory = 'qr' | 'pdf' | 'media' | 'dev' | 'text';

export interface ToolItem {
  id: string;
  slug: string;
  name: string;
  category: ToolCategory;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  isPopular?: boolean;
  isNew?: boolean;
  isPro?: boolean;
  targetKeywords: string[];
  schemaType: string;
  metaTitle: string;
  metaDescription: string;
  howToSteps: { step: string; instruction: string }[];
  faqs: { question: string; answer: string }[];
}

export interface UserState {
  tier: 'free' | 'pro';
  name: string;
  email: string;
  dailyUsageCount: number;
  maxFreeDailyLimit: number;
  isAuthenticated: boolean;
}

export interface ToolHistoryEntry {
  id: string;
  toolId: string;
  toolName: string;
  timestamp: string;
  summary: string;
  previewData?: string;
  category: ToolCategory;
}

export interface QrOptions {
  type: 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'sms' | 'whatsapp' | 'crypto';
  content: string;
  // Specific fields
  wifiSsid?: string;
  wifiPassword?: string;
  wifiEncryption?: 'WPA' | 'WEP' | 'nopass';
  vcardName?: string;
  vcardPhone?: string;
  vcardEmail?: string;
  vcardOrg?: string;
  vcardUrl?: string;
  cryptoType?: 'bitcoin' | 'ethereum' | 'solana' | 'usdt';
  cryptoAddress?: string;
  cryptoAmount?: string;
  // Styling
  fgColor: string;
  bgColor: string;
  eyeStyle: 'square' | 'rounded' | 'dots';
  dotStyle: 'square' | 'dots' | 'rounded';
  logoUrl?: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  size: number;
  margin: number;
}
