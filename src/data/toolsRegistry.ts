import { ToolItem } from '../types';

export const CATEGORY_INFO = {
  qr: {
    id: 'qr',
    name: 'QR Code Suite',
    description: 'Vector-sharp QR generation with custom logos, eye designs, and multi-format exports.',
    color: 'from-blue-500/10 to-indigo-500/10 text-indigo-400 border-indigo-500/20'
  },
  pdf: {
    id: 'pdf',
    name: 'Document & PDF',
    description: 'Browser-based PDF signing, conversions, watermarking, merging, and cryptographic security.',
    color: 'from-emerald-500/10 to-teal-500/10 text-teal-400 border-teal-500/20'
  },
  media: {
    id: 'media',
    name: 'Media, Audio & AI',
    description: 'Neural speech synthesis, Whisper transcription, AI background removal, and bulk media conversion.',
    color: 'from-purple-500/10 to-pink-500/10 text-purple-400 border-purple-500/20'
  },
  dev: {
    id: 'dev',
    name: 'Developer & Webmaster',
    description: 'Syntax formatters, cryptographic RSA/hash generators, URL analytics, and color palette extractors.',
    color: 'from-amber-500/10 to-orange-500/10 text-amber-400 border-amber-500/20'
  },
  text: {
    id: 'text',
    name: 'Writing & Text Utilities',
    description: 'Readability analytics, Markdown dual-pane live compiler, case transformation, and synthetic data generators.',
    color: 'from-cyan-500/10 to-sky-500/10 text-sky-400 border-sky-500/20'
  }
} as const;

export const TOOLS_REGISTRY: ToolItem[] = [
  // Category A: Advanced QR Code Suite
  {
    id: 'qr-url',
    slug: 'link-to-qr-code',
    name: 'Link to QR Code Generator',
    category: 'qr',
    shortDesc: 'Convert URLs and web links into vector QR codes with custom brand logos and styled eyes.',
    fullDesc: 'Generate ultra-high-resolution, customizable QR codes for any website or destination URL. Customize foreground and background palettes, add company center logos, select rounded or sharp corner eyes, and export in SVG, PNG, or JPG.',
    icon: 'QrCode',
    isPopular: true,
    targetKeywords: ['link to qr code', 'qr code generator', 'make url qr code', 'svg qr code generator', 'free vector qr code'],
    schemaType: 'WebApplication',
    metaTitle: 'Free Link to QR Code Generator with Custom Logo | OmniTool',
    metaDescription: 'Create custom QR codes from web links in seconds. Add custom logos, choose color palettes, and download vector SVG and high-res PNG formats for print and digital use.',
    howToSteps: [
      { step: 'Paste your URL', instruction: 'Enter the destination web address including https:// in the input field.' },
      { step: 'Customize Styling', instruction: 'Choose brand foreground and background colors, adjust corner eye shapes, and optionally upload a center logo.' },
      { step: 'Export Vector or Raster', instruction: 'Click to download crisp SVG vector format for print or high-resolution PNG/JPG for web use.' }
    ],
    faqs: [
      { question: 'Do these QR codes ever expire?', answer: 'No, static QR codes directly encode the destination link in the matrix patterns and remain functional permanently.' },
      { question: 'Can I print these on physical signage and business cards?', answer: 'Yes! Download the SVG vector format which scales infinitely without pixelation or quality loss.' }
    ]
  },
  {
    id: 'qr-wifi',
    slug: 'wifi-qr-code-generator',
    name: 'Wi-Fi Network QR Code',
    category: 'qr',
    shortDesc: 'Create instant scan-to-connect Wi-Fi QR codes with WPA/WEP encryption support.',
    fullDesc: 'Allow guests and visitors to instantly connect to your home or office Wi-Fi network without typing complex passwords. Supports WPA/WPA2/WPA3, WEP, and hidden networks.',
    icon: 'Wifi',
    targetKeywords: ['wifi qr code', 'scan to connect wifi', 'wifi password qr generator'],
    schemaType: 'WebApplication',
    metaTitle: 'Wi-Fi QR Code Generator — Instant Connect | OmniTool',
    metaDescription: 'Generate secure Wi-Fi QR codes for home and office. Scan with any iOS or Android camera to instantly connect without entering network passwords.',
    howToSteps: [
      { step: 'Enter SSID', instruction: 'Input your Wi-Fi network name exactly as it appears in network settings.' },
      { step: 'Set Security & Password', instruction: 'Select WPA/WPA2/WPA3 or WEP and type your network key.' },
      { step: 'Print Signage', instruction: 'Download and print the generated code for your guest lobby or living room.' }
    ],
    faqs: [
      { question: 'Is my Wi-Fi password sent to a server?', answer: 'No. The QR matrix is generated 100% locally in your browser memory for maximum privacy.' }
    ]
  },
  {
    id: 'qr-vcard',
    slug: 'vcard-qr-code-generator',
    name: 'Digital Business Card (vCard)',
    category: 'qr',
    shortDesc: 'Encode full contact details, email, phone, job title, and social links into a contact QR.',
    fullDesc: 'Streamline networking with a digital business card. Scanning automatically opens the native contact book on iOS and Android devices, pre-filling name, phone number, email, and company title.',
    icon: 'Contact',
    targetKeywords: ['vcard qr code', 'digital business card qr', 'contact qr code generator'],
    schemaType: 'WebApplication',
    metaTitle: 'vCard QR Code Generator — Digital Business Card | OmniTool',
    metaDescription: 'Create smart vCard QR codes for business cards. Scanning adds your full contact details, phone, email, and social profiles directly to phonebooks.',
    howToSteps: [
      { step: 'Fill Contact Details', instruction: 'Enter your name, job title, organization, phone number, and email.' },
      { step: 'Format Preview', instruction: 'Verify the vCard 3.0 specification output in the real-time card preview.' },
      { step: 'Download & Embed', instruction: 'Add the vector QR code to your printed cards or digital resume.' }
    ],
    faqs: [
      { question: 'Does this work on both iPhone and Android?', answer: 'Yes, both iOS Camera and Android Lens recognize standard vCard payloads natively.' }
    ]
  },
  {
    id: 'qr-whatsapp',
    slug: 'whatsapp-chat-qr-code',
    name: 'WhatsApp & SMS Direct QR',
    category: 'qr',
    shortDesc: 'Generate click-to-chat QR codes with pre-filled support or inquiry messages.',
    fullDesc: 'Direct customers straight into a WhatsApp conversation or SMS thread with a pre-configured greeting. Eliminates the need for users to manually save your phone number before messaging.',
    icon: 'MessageSquare',
    targetKeywords: ['whatsapp qr code generator', 'click to chat qr', 'sms qr code'],
    schemaType: 'WebApplication',
    metaTitle: 'WhatsApp Direct Chat QR Code Generator | OmniTool',
    metaDescription: 'Generate instant WhatsApp chat QR codes with pre-filled messages. Perfect for customer support, sales inquiries, and retail counters.',
    howToSteps: [
      { step: 'Enter International Number', instruction: 'Include your full country code without the plus sign.' },
      { step: 'Type Welcome Message', instruction: 'Write an optional starting message such as "Hi, I have an inquiry about..."' },
      { step: 'Deploy Code', instruction: 'Download and place on product packaging, receipts, or advertisements.' }
    ],
    faqs: [
      { question: 'Does the scanner need WhatsApp installed?', answer: 'Yes, scanning triggers the native WhatsApp app on mobile or WhatsApp Web on desktop.' }
    ]
  },
  {
    id: 'qr-crypto',
    slug: 'crypto-wallet-qr-code',
    name: 'Crypto Wallet Payment QR',
    category: 'qr',
    shortDesc: 'Create payment QR codes for Bitcoin, Ethereum, Solana, and USDT wallets.',
    fullDesc: 'Generate error-free cryptocurrency payment QR codes with address validation, optional requested token amount, and chain-specific URI schemas (BIP-21, EIP-681).',
    icon: 'Coins',
    targetKeywords: ['crypto qr code generator', 'bitcoin payment qr', 'ethereum qr code', 'solana wallet qr'],
    schemaType: 'WebApplication',
    metaTitle: 'Crypto Wallet QR Code Generator (BTC, ETH, SOL) | OmniTool',
    metaDescription: 'Generate cryptocurrency payment QR codes for Bitcoin, Ethereum, Solana, and USDT. Eliminate address typos with instant scan-to-pay codes.',
    howToSteps: [
      { step: 'Select Blockchain', instruction: 'Choose between Bitcoin (BTC), Ethereum (ETH), Solana (SOL), or USDT.' },
      { step: 'Paste Public Address', instruction: 'Paste your receiving public wallet address.' },
      { step: 'Specify Amount', instruction: 'Optionally designate a fixed donation or invoice amount in the token URI.' }
    ],
    faqs: [
      { question: 'Can anyone steal my funds from this QR?', answer: 'Never. The QR code only contains your public receiving address, which is safe to share publicly.' }
    ]
  },
  {
    id: 'qr-text',
    slug: 'plain-text-qr-code',
    name: 'Plain Text & Note QR Code',
    category: 'qr',
    shortDesc: 'Encode alphanumeric notes, secret codes, serial numbers, or raw text strings.',
    fullDesc: 'Encode up to 2,000 characters of raw text, Markdown notes, passwords, or serial identifiers into a standalone offline QR code matrix.',
    icon: 'FileText',
    targetKeywords: ['text qr code', 'secret message qr code', 'notes qr generator'],
    schemaType: 'WebApplication',
    metaTitle: 'Plain Text QR Code Generator | OmniTool',
    metaDescription: 'Encode raw text messages, serial numbers, and notes into offline scannable QR codes without internet connectivity.',
    howToSteps: [
      { step: 'Enter Text', instruction: 'Type or paste any plain text note or serial key.' },
      { step: 'Adjust Size', instruction: 'Increase error correction for high density text strings.' },
      { step: 'Save Code', instruction: 'Export in your preferred image or vector format.' }
    ],
    faqs: [
      { question: 'Can this be scanned without an internet connection?', answer: 'Yes! Plain text QR codes do not require internet access to read and display on the scanner.' }
    ]
  },

  // Category B: Document & PDF Operations
  {
    id: 'pdf-sign',
    slug: 'sign-pdf-online',
    name: 'Digital PDF Signer',
    category: 'pdf',
    shortDesc: 'Draw, type, or upload electronic signatures directly onto PDF documents.',
    fullDesc: 'Sign contracts, NDAs, and agreements securely in your web browser. Draw signatures using touch or mouse, type with elegant signature calligraphy, or upload signature PNG stamps.',
    icon: 'PenTool',
    isPopular: true,
    targetKeywords: ['sign pdf online free', 'digital signature pdf', 'draw signature on pdf', 'electronic signature tool'],
    schemaType: 'WebApplication',
    metaTitle: 'Free Digital PDF Signer — Sign Documents in Browser | OmniTool',
    metaDescription: 'Sign contracts and PDF files securely without printing. Draw signatures, type legal calligraphy, or stamp transparent signatures with zero server uploads.',
    howToSteps: [
      { step: 'Upload Document', instruction: 'Select any PDF file or sample agreement to sign.' },
      { step: 'Create Signature', instruction: 'Draw with precision, choose an elegant handwritten typeface, or upload an image.' },
      { step: 'Position & Download', instruction: 'Drag and place signature stamps on any page and export your finalized signed document.' }
    ],
    faqs: [
      { question: 'Are my confidential documents uploaded to a remote server?', answer: 'No. All document rendering and canvas placement happens 100% locally inside your browser memory for airtight privacy.' }
    ]
  },
  {
    id: 'pdf-image-to-pdf',
    slug: 'image-to-pdf-converter',
    name: 'Image to PDF Compiler',
    category: 'pdf',
    shortDesc: 'Combine multiple JPG, PNG, and WebP images into a single formatted PDF document.',
    fullDesc: 'Batch convert photos, receipt scans, and screenshots into standardized A4 or letter-sized PDF files with customizable page margins and orientation.',
    icon: 'Images',
    targetKeywords: ['jpg to pdf', 'image to pdf converter', 'convert photos to pdf', 'png to pdf merge'],
    schemaType: 'WebApplication',
    metaTitle: 'Image to PDF Converter (JPG, PNG to PDF) | OmniTool',
    metaDescription: 'Convert and merge JPG and PNG photos into a clean PDF document. Reorder pages, adjust margins, and export in seconds.',
    howToSteps: [
      { step: 'Select Images', instruction: 'Drop your JPG, PNG, or WebP files into the uploader.' },
      { step: 'Reorder Pages', instruction: 'Drag thumbnails to arrange pages in your desired sequence.' },
      { step: 'Compile PDF', instruction: 'Click Generate PDF to bundle images into a unified downloadable document.' }
    ],
    faqs: [
      { question: 'Is there a limit on file size?', answer: 'Standard users can compile up to 20 images at once. Pro tier supports unlimited batch compilations.' }
    ]
  },
  {
    id: 'pdf-watermark',
    slug: 'add-watermark-to-pdf',
    name: 'PDF Watermark & Stamp Adder',
    category: 'pdf',
    shortDesc: 'Apply CONFIDENTIAL, DRAFT, copyright, or custom diagonal text watermarks.',
    fullDesc: 'Protect intellectual property by applying customizable text or image watermarks across every page of your PDF documents with custom rotation, opacity, and color styling.',
    icon: 'Stamp',
    targetKeywords: ['add watermark to pdf', 'pdf stamp tool', 'confidential watermark pdf'],
    schemaType: 'WebApplication',
    metaTitle: 'Add Watermark to PDF Online Free | OmniTool',
    metaDescription: 'Protect confidential documents with custom text and image watermarks. Set custom opacity, angle, font, and positioning across all pages.',
    howToSteps: [
      { step: 'Upload PDF', instruction: 'Select the target PDF file from your device.' },
      { step: 'Customize Text', instruction: 'Type your watermark string (e.g., CONFIDENTIAL, DRAFT) and adjust rotation angle and transparency.' },
      { step: 'Apply & Export', instruction: 'Preview the rendered watermark on each page and download the protected PDF.' }
    ],
    faqs: [
      { question: 'Can the watermark be easily deleted?', answer: 'Our tool embeds the watermark directly into the vector layer or rasterizes it to prevent trivial removal.' }
    ]
  },
  {
    id: 'pdf-merge',
    slug: 'merge-pdf-files',
    name: 'PDF Merger & Page Combiner',
    category: 'pdf',
    shortDesc: 'Combine multiple PDF files into one clean document with drag-and-drop ordering.',
    fullDesc: 'Merge multiple PDF presentations, invoices, or chapters into a single coherent document. Reorder files effortlessly with real-time thumbnail previews.',
    icon: 'Layers',
    targetKeywords: ['merge pdf', 'combine pdf files', 'pdf joiner free'],
    schemaType: 'WebApplication',
    metaTitle: 'Merge PDF Files Online — Combine Documents | OmniTool',
    metaDescription: 'Combine multiple PDF documents into a single organized file in seconds. Drag and drop to reorder pages with zero quality degradation.',
    howToSteps: [
      { step: 'Add PDF Files', instruction: 'Select 2 or more PDF documents from your hard drive.' },
      { step: 'Arrange Order', instruction: 'Drag file cards up or down to set the final reading sequence.' },
      { step: 'Download Merged PDF', instruction: 'Click Merge to generate and save your unified PDF.' }
    ],
    faqs: [
      { question: 'Will hyperlinks and bookmarks be preserved?', answer: 'Yes, page structures and internal document hyperlinks are maintained during the merge.' }
    ]
  },
  {
    id: 'pdf-split',
    slug: 'split-pdf-pages',
    name: 'PDF Splitter & Page Extractor',
    category: 'pdf',
    shortDesc: 'Extract specific page ranges or split a large PDF into individual standalone files.',
    fullDesc: 'Break down unwieldy multi-page documents. Select individual pages or custom ranges (e.g., 1-5, 8, 12-15) and export them as lightweight, separate PDF files.',
    icon: 'Scissors',
    targetKeywords: ['split pdf', 'extract pages from pdf', 'separate pdf pages'],
    schemaType: 'WebApplication',
    metaTitle: 'Split PDF Pages Online Free | OmniTool',
    metaDescription: 'Extract specific pages or page ranges from any PDF document. Fast, secure, and processed entirely inside your web browser.',
    howToSteps: [
      { step: 'Choose File', instruction: 'Upload the document you wish to split.' },
      { step: 'Specify Ranges', instruction: 'Enter the exact page numbers or ranges you wish to extract.' },
      { step: 'Extract', instruction: 'Download the extracted document or a ZIP archive of individual single-page files.' }
    ],
    faqs: [
      { question: 'Does splitting affect text searchability?', answer: 'No, all OCR and searchable text layers remain completely intact.' }
    ]
  },
  {
    id: 'pdf-password',
    slug: 'protect-pdf-with-password',
    name: 'PDF Password Encryptor',
    category: 'pdf',
    shortDesc: 'Add 256-bit AES encryption and password protection to sensitive documents.',
    fullDesc: 'Ensure legal and financial documents cannot be opened without authorized credentials. Apply military-grade AES encryption and set user permissions.',
    icon: 'Lock',
    targetKeywords: ['password protect pdf', 'encrypt pdf online', 'pdf security tool'],
    schemaType: 'WebApplication',
    metaTitle: 'Password Protect PDF Online — 256-bit AES Encryption | OmniTool',
    metaDescription: 'Lock sensitive PDF documents with strong AES password protection. Restrict unauthorized viewing and prevent accidental data leaks.',
    howToSteps: [
      { step: 'Upload Document', instruction: 'Select your confidential document.' },
      { step: 'Set Strong Password', instruction: 'Enter an encryption password with mixed case and numbers.' },
      { step: 'Download Encrypted PDF', instruction: 'Save the locked document. Any viewer will require the password to open.' }
    ],
    faqs: [
      { question: 'What happens if I forget the password?', answer: 'Because standard AES encryption is irreversible, make sure to keep a secure record of your password.' }
    ]
  },

  // Category C: Media, Audio & AI Utilities
  {
    id: 'media-transcribe',
    slug: 'audio-to-text-transcription',
    name: 'Voice & Audio to Text (Whisper AI)',
    category: 'media',
    shortDesc: 'Transcribe spoken audio recordings and voice notes into clean text with timestamps.',
    fullDesc: 'Transform audio files (MP3, WAV, M4A) or live microphone dictations into accurate text. Supports automatic punctuation, speaker separation, and SRT subtitle exports.',
    icon: 'Mic',
    isPopular: true,
    isPro: true,
    targetKeywords: ['audio to text', 'voice transcription free', 'whisper ai transcribe', 'speech to text converter'],
    schemaType: 'WebApplication',
    metaTitle: 'AI Audio to Text Transcription (Whisper AI) | OmniTool',
    metaDescription: 'Convert voice recordings and podcasts into formatted text transcripts. Fast neural speech recognition with timestamps and subtitle exports.',
    howToSteps: [
      { step: 'Record or Upload', instruction: 'Speak into your microphone or upload an MP3/WAV audio file.' },
      { step: 'Transcribe', instruction: 'Our neural recognition engine processes your recording in real-time.' },
      { step: 'Export Formats', instruction: 'Copy the transcript text or export formatted SRT subtitle files.' }
    ],
    faqs: [
      { question: 'What languages are supported?', answer: 'English, Spanish, French, German, Japanese, Chinese, and over 40 global languages.' }
    ]
  },
  {
    id: 'media-tts',
    slug: 'text-to-speech-generator',
    name: 'Neural Text to Speech (TTS)',
    category: 'media',
    shortDesc: 'Synthesize natural, human-sounding speech from plain text with voice controls.',
    fullDesc: 'Generate studio-grade voiceovers for videos, presentations, and accessibility. Choose from multiple neural vocal profiles, adjust speaking rate and pitch, and download audio.',
    icon: 'Volume2',
    targetKeywords: ['text to speech online', 'tts audio generator', 'ai voice generator free'],
    schemaType: 'WebApplication',
    metaTitle: 'Neural Text to Speech (TTS) Generator | OmniTool',
    metaDescription: 'Synthesize lifelike voiceovers from text. Fine-tune pitch and playback speed, preview in real-time, and download crystal-clear audio files.',
    howToSteps: [
      { step: 'Type or Paste Text', instruction: 'Enter the script or sentence you want spoken.' },
      { step: 'Select Voice & Tone', instruction: 'Choose between natural voices and tweak speed and pitch.' },
      { step: 'Play & Download', instruction: 'Listen to the synthesized output and save the generated audio.' }
    ],
    faqs: [
      { question: 'Can I use the generated audio for commercial videos?', answer: 'Yes! All synthesized voice tracks are 100% royalty-free for commercial and personal usage.' }
    ]
  },
  {
    id: 'media-bg-remover',
    slug: 'ai-background-remover',
    name: 'AI Background Remover',
    category: 'media',
    shortDesc: 'Remove backgrounds from portrait, product, and graphic images with transparent PNG output.',
    fullDesc: 'Isolate subjects and eliminate distracting backdrops from product photography and profile portraits. Produces clean transparent alpha PNGs in seconds.',
    icon: 'Sparkles',
    isPopular: true,
    isPro: true,
    targetKeywords: ['remove background from image', 'transparent png maker', 'ai background eraser'],
    schemaType: 'WebApplication',
    metaTitle: 'Instant Background Remover — Transparent PNG | OmniTool',
    metaDescription: 'Cut out image backgrounds automatically with smart edge detection. Download transparent PNG files ready for e-commerce, logos, and avatars.',
    howToSteps: [
      { step: 'Drop Image', instruction: 'Upload any portrait or product photo with a distinct subject.' },
      { step: 'Instant Alpha Extraction', instruction: 'The edge algorithm separates the foreground subject.' },
      { step: 'Save Transparent PNG', instruction: 'Download your cut-out asset ready for presentation decks or stores.' }
    ],
    faqs: [
      { question: 'Does it work on complex hair and edges?', answer: 'Yes, our edge refinement preserves delicate hair strands and feathered borders.' }
    ]
  },
  {
    id: 'media-resizer',
    slug: 'bulk-image-resizer',
    name: 'Bulk Image Resizer & Scaler',
    category: 'media',
    shortDesc: 'Resize photos to exact pixel dimensions or preset social media aspect ratios.',
    fullDesc: 'Batch process images for web optimization, Instagram stories, YouTube thumbnails, or banner ads. Constrain proportions or crop to custom aspect ratios.',
    icon: 'Maximize',
    targetKeywords: ['image resizer online', 'bulk resize photos', 'social media image size scaler'],
    schemaType: 'WebApplication',
    metaTitle: 'Bulk Image Resizer & Aspect Ratio Scaler | OmniTool',
    metaDescription: 'Resize photos to exact dimensions or preset social aspect ratios in bulk. Retain crisp visual sharpness while drastically reducing load times.',
    howToSteps: [
      { step: 'Select Images', instruction: 'Upload one or multiple photos to resize.' },
      { step: 'Set Target Dimensions', instruction: 'Enter exact pixel width/height or choose a social preset.' },
      { step: 'Batch Download', instruction: 'Export individual resized files or a bundled ZIP archive.' }
    ],
    faqs: [
      { question: 'Will resizing degrade photo quality?', answer: 'We apply bicubic lanczos resampling to maintain crisp sharpness without blurring.' }
    ]
  },
  {
    id: 'media-converter',
    slug: 'image-format-converter',
    name: 'Image Format Converter (WebP, PNG, JPG)',
    category: 'media',
    shortDesc: 'Convert between WebP, PNG, JPG, and AVIF with custom compression quality.',
    fullDesc: 'Modernize your website media by converting heavy PNGs and JPGs into lightweight next-gen WebP format. Adjust compression sliders to hit exact target kilobyte thresholds.',
    icon: 'RefreshCw',
    targetKeywords: ['png to webp converter', 'jpg to png', 'image format converter online'],
    schemaType: 'WebApplication',
    metaTitle: 'Image Format Converter (PNG, JPG, WebP) | OmniTool',
    metaDescription: 'Convert images to modern WebP, PNG, or JPG formats in your browser. Slash page payload sizes by up to 80% while retaining visual fidelity.',
    howToSteps: [
      { step: 'Drop Files', instruction: 'Upload any standard raster image.' },
      { step: 'Pick Target Format', instruction: 'Select WebP, PNG, or JPG and tune compression quality.' },
      { step: 'Save Files', instruction: 'Download optimized lightweight image assets.' }
    ],
    faqs: [
      { question: 'Why should I convert to WebP?', answer: 'WebP provides up to 30% smaller file sizes than standard JPGs with equal perceptual quality, boosting Google Core Web Vitals.' }
    ]
  },
  {
    id: 'media-video-gif',
    slug: 'video-to-gif-converter',
    name: 'Video to GIF & MP3 Converter',
    category: 'media',
    shortDesc: 'Turn video clips into animated GIFs or strip audio tracks into standalone MP3 files.',
    fullDesc: 'Extract audio soundtracks from video clips or convert short MP4 videos into high-frame-rate animated GIFs with customizable frame rate and dimensions.',
    icon: 'Film',
    targetKeywords: ['video to gif converter', 'mp4 to gif', 'extract mp3 from video'],
    schemaType: 'WebApplication',
    metaTitle: 'Video to GIF & MP3 Converter | OmniTool',
    metaDescription: 'Convert video clips into animated GIFs or extract audio tracks into MP3s. Fast browser-based conversion with custom frame rate controls.',
    howToSteps: [
      { step: 'Upload Video', instruction: 'Select an MP4, WebM, or MOV video clip.' },
      { step: 'Configure Frames', instruction: 'Choose between Animated GIF output or MP3 audio extraction.' },
      { step: 'Export', instruction: 'Download the compiled GIF loop or audio track.' }
    ],
    faqs: [
      { question: 'Can I set custom loop counts on GIFs?', answer: 'Yes, infinite looping or fixed repetition cycles are fully supported.' }
    ]
  },

  // Category D: Developer & Webmaster Tools
  {
    id: 'dev-url-shortener',
    slug: 'url-shortener-analytics',
    name: 'URL Shortener with Analytics',
    category: 'dev',
    shortDesc: 'Create branded short links with real-time click tracking, device analytics, and QR pairing.',
    fullDesc: 'Shorten bulky links into concise, branded URLs. Track total clicks, referrer breakdown, geographical origin, and automatically generate a companion QR code.',
    icon: 'Link',
    isPopular: true,
    targetKeywords: ['url shortener', 'link shortener with analytics', 'custom short url generator'],
    schemaType: 'WebApplication',
    metaTitle: 'Smart URL Shortener with Real-Time Analytics | OmniTool',
    metaDescription: 'Create clean short URLs with click analytics, device telemetry, and instant QR code companion graphics. Track marketing campaign ROI.',
    howToSteps: [
      { step: 'Paste Long URL', instruction: 'Enter the destination link you want to track and shorten.' },
      { step: 'Customize Alias', instruction: 'Choose an optional custom vanity slug (e.g., /launch-2026).' },
      { step: 'Monitor Engagement', instruction: 'View real-time click charts, referrers, and export companion QR code.' }
    ],
    faqs: [
      { question: 'Do short links expire?', answer: 'Free links remain active for 12 months with activity. Pro links never expire.' }
    ]
  },
  {
    id: 'dev-code-formatter',
    slug: 'code-formatter-minifier',
    name: 'Code Formatter & Minifier (HTML, CSS, JS, JSON, SQL)',
    category: 'dev',
    shortDesc: 'Beautify or compress HTML, CSS, JavaScript, JSON, and SQL syntax with instant copy.',
    fullDesc: 'Clean up unformatted spaghetti code or strip unnecessary whitespace and comments to compress payloads. Features syntax validation, line counting, and compression ratio stats.',
    icon: 'Code2',
    isPopular: true,
    targetKeywords: ['json formatter', 'sql beautifier', 'css minifier', 'html formatter online', 'js minifier'],
    schemaType: 'WebApplication',
    metaTitle: 'Universal Code Formatter & Minifier (JSON, SQL, CSS, JS) | OmniTool',
    metaDescription: 'Beautify and minify JSON, SQL, HTML, CSS, and JavaScript instantly in your browser. Calculate byte savings and validate syntax syntax.',
    howToSteps: [
      { step: 'Select Language', instruction: 'Choose JSON, SQL, CSS, JavaScript, or HTML from the tab bar.' },
      { step: 'Paste Code', instruction: 'Paste messy, unformatted, or minified text into the code console.' },
      { step: 'Format or Minify', instruction: 'Click Beautify for indented readability or Minify to strip bytes for production.' }
    ],
    faqs: [
      { question: 'Will this validate syntax errors?', answer: 'Yes, syntax errors like missing brackets or invalid JSON commas are highlighted with line numbers.' }
    ]
  },
  {
    id: 'dev-password-gen',
    slug: 'secure-password-generator',
    name: 'Secure Password & RSA Key Generator',
    category: 'dev',
    shortDesc: 'Generate cryptographically random passwords, passphrases, and 2048/4096-bit RSA keypairs.',
    fullDesc: 'Generate uncrackable passwords using Web Crypto API entropy. Configure character sets, memorable diceware passphrases, or generate public/private PEM RSA key pairs for SSH and TLS.',
    icon: 'Key',
    targetKeywords: ['secure password generator', 'rsa key generator online', 'diceware passphrase generator'],
    schemaType: 'WebApplication',
    metaTitle: 'Cryptographic Password & RSA Key Generator | OmniTool',
    metaDescription: 'Generate secure random passwords, memorable passphrases, and 2048/4096-bit RSA PEM key pairs using browser-native Web Crypto entropy.',
    howToSteps: [
      { step: 'Set Entropy Parameters', instruction: 'Choose length, uppercase, lowercase, numbers, and special symbols.' },
      { step: 'Switch Mode', instruction: 'Toggle between Password, Diceware Passphrase, or RSA Keypair generation.' },
      { step: 'Copy Securely', instruction: 'Click copy to clipboard. Generated keys are never logged or stored.' }
    ],
    faqs: [
      { question: 'How is randomness generated?', answer: 'We use window.crypto.getRandomValues(), the browser standard for cryptographic-strength entropy.' }
    ]
  },
  {
    id: 'dev-hash-base64',
    slug: 'hash-generator-base64',
    name: 'Hash & Base64 Encoder/Decoder',
    category: 'dev',
    shortDesc: 'Compute SHA-256, SHA-512, MD5 checksums and encode/decode Base64 strings and files.',
    fullDesc: 'Generate cryptographic message digests to verify file integrity. Encode and decode UTF-8 strings or binary files to Base64 data URIs for web stylesheets and API payloads.',
    icon: 'Binary',
    targetKeywords: ['sha256 generator', 'base64 encode decode', 'md5 hash online', 'file checksum tool'],
    schemaType: 'WebApplication',
    metaTitle: 'Hash Generator & Base64 Encoder/Decoder | OmniTool',
    metaDescription: 'Calculate instant SHA-256, SHA-512, and MD5 hashes. Encode and decode Base64 strings and image data URIs in real-time.',
    howToSteps: [
      { step: 'Input String or File', instruction: 'Enter text or drop a file to compute hashes.' },
      { step: 'Review Hashes', instruction: 'Examine hexadecimal digests for SHA-256, SHA-512, and Base64 representations.' },
      { step: 'Copy Results', instruction: 'Copy hashes for API verification or Git commit comparisons.' }
    ],
    faqs: [
      { question: 'Is SHA-256 secure for password storage?', answer: 'SHA-256 is ideal for message digests and file verification; for passwords, salted Argon2 or bcrypt is recommended.' }
    ]
  },
  {
    id: 'dev-color-palette',
    slug: 'color-palette-generator',
    name: 'Color Palette & Tone Extractor',
    category: 'dev',
    shortDesc: 'Extract dominant color schemes from images and generate harmonious HEX/RGB/HSL palettes.',
    fullDesc: 'Upload photographs or UI screenshots to automatically extract dominant harmonious color palettes. Export ready-to-use CSS variables, Tailwind configuration snippets, and check WCAG contrast.',
    icon: 'Palette',
    isPopular: true,
    targetKeywords: ['extract palette from image', 'color palette generator', 'hex rgb hsl converter', 'tailwind color palette'],
    schemaType: 'WebApplication',
    metaTitle: 'Color Palette Generator & Image Tone Extractor | OmniTool',
    metaDescription: 'Extract vibrant color palettes from uploaded images. Generate HEX, RGB, HSL codes, test WCAG accessibility contrast, and export Tailwind theme configs.',
    howToSteps: [
      { step: 'Upload Image or Randomize', instruction: 'Drop any visual asset or press Space to generate an algorithmic harmony.' },
      { step: 'Inspect Swatches', instruction: 'Click any color swatch to copy HEX, RGB, or HSL color codes.' },
      { step: 'Export Code', instruction: 'Copy ready-to-paste Tailwind CSS theme config or CSS custom properties.' }
    ],
    faqs: [
      { question: 'Does it calculate WCAG contrast ratios?', answer: 'Yes! Every swatch includes automated dark and light text contrast ratios (4.5:1 AA compliance).' }
    ]
  },

  // Category E: Writing & Text Utilities
  {
    id: 'text-word-counter',
    slug: 'word-character-reading-time-counter',
    name: 'Word, Character & Reading Time Counter',
    category: 'text',
    shortDesc: 'Live prose analysis: word count, reading time, syllable density, and readability grade.',
    fullDesc: 'Comprehensive writing intelligence. Calculates words, characters (with and without spaces), sentences, paragraphs, estimated reading and speaking duration, and Flesch-Kincaid readability grade.',
    icon: 'Hash',
    isPopular: true,
    targetKeywords: ['word counter', 'character count online', 'reading time calculator', 'flesch kincaid readability tool'],
    schemaType: 'WebApplication',
    metaTitle: 'Live Word, Character & Reading Time Counter | OmniTool',
    metaDescription: 'Analyze your copy in real-time. Calculate word count, character count, sentence length, reading speed, and Flesch readability grade for essays and social posts.',
    howToSteps: [
      { step: 'Paste Text', instruction: 'Type or paste your article, essay, or blog draft.' },
      { step: 'Live Telemetry', instruction: 'Watch word, character, and reading duration metrics calculate dynamically.' },
      { step: 'Evaluate Readability', instruction: 'Check grade level scores to optimize readability for your audience.' }
    ],
    faqs: [
      { question: 'What reading speed is used for time calculations?', answer: 'We calculate reading time based on 225 words per minute (average silent reading) and speaking time at 140 wpm.' }
    ]
  },
  {
    id: 'text-case-converter',
    slug: 'case-converter-camelcase-snakecase',
    name: 'Smart Case Converter',
    category: 'text',
    shortDesc: 'Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.',
    fullDesc: 'Instantly transform code variables and text typography. Supports Sentence case, Title Case, camelCase, PascalCase, snake_case, CONSTANT_CASE, kebab-case, and alternating mock case.',
    icon: 'Type',
    targetKeywords: ['case converter', 'camelcase to snake_case', 'title case converter', 'uppercase to lowercase'],
    schemaType: 'WebApplication',
    metaTitle: 'Case Converter — camelCase, snake_case, Title Case | OmniTool',
    metaDescription: 'Convert text and code variables instantly between camelCase, snake_case, PascalCase, Title Case, and UPPERCASE with one click.',
    howToSteps: [
      { step: 'Input String', instruction: 'Paste variable names, headlines, or sentences.' },
      { step: 'Click Target Case', instruction: 'Select your target casing convention from the interactive list.' },
      { step: 'Copy Result', instruction: 'Click Copy to instantly paste the transformed string into your codebase.' }
    ],
    faqs: [
      { question: 'Does Title Case follow Chicago or AP style?', answer: 'It preserves minor articles (a, an, the, in, on) in lowercase matching standard Chicago Manual of Style.' }
    ]
  },
  {
    id: 'text-markdown-html',
    slug: 'markdown-to-html-converter',
    name: 'Markdown to HTML Live Editor',
    category: 'text',
    shortDesc: 'Dual-pane Markdown compiler with live HTML preview, syntax highlighting, and code exporter.',
    fullDesc: 'Write GitHub-flavored Markdown with a synchronized split-screen HTML preview. Supports tables, code blocks, blockquotes, checklists, and exports clean semantic HTML.',
    icon: 'FileCode',
    targetKeywords: ['markdown to html converter', 'live markdown editor', 'github markdown preview'],
    schemaType: 'WebApplication',
    metaTitle: 'Markdown to HTML Converter & Live Dual-Pane Editor | OmniTool',
    metaDescription: 'Write and preview GitHub-flavored Markdown in real-time. Export clean semantic HTML markup ready for CMS platforms and newsletters.',
    howToSteps: [
      { step: 'Compose Markdown', instruction: 'Type Markdown syntax in the left editor pane.' },
      { step: 'Live Visual Preview', instruction: 'Review the formatted layout in real-time on the right preview pane.' },
      { step: 'Copy Clean HTML', instruction: 'Click Copy HTML to copy the converted markup.' }
    ],
    faqs: [
      { question: 'Does it support GitHub task lists and tables?', answer: 'Yes! Full GFM specifications including tables, strikethrough, and interactive checkboxes are supported.' }
    ]
  },
  {
    id: 'text-dummy-data',
    slug: 'lorem-ipsum-dummy-data-generator',
    name: 'Lorem Ipsum & Synthetic Data Generator',
    category: 'text',
    shortDesc: 'Generate dummy placeholder prose, fake user records in JSON, CSV, and SQL formats.',
    fullDesc: 'Rapidly generate mock data for UI testing and database seeding. Create standard Cicero Lorem Ipsum paragraphs or generate realistic user profiles with names, emails, avatars, and cities in JSON/CSV/SQL.',
    icon: 'Database',
    targetKeywords: ['lorem ipsum generator', 'dummy json generator', 'mock data csv generator', 'fake user data'],
    schemaType: 'WebApplication',
    metaTitle: 'Lorem Ipsum & Mock Data Generator (JSON, CSV, SQL) | OmniTool',
    metaDescription: 'Generate dummy placeholder text and realistic synthetic data for testing. Export custom user records in JSON, CSV, or SQL INSERT formats.',
    howToSteps: [
      { step: 'Select Data Mode', instruction: 'Choose between Lorem Ipsum text or Structured Synthetic Mock Data.' },
      { step: 'Configure Count & Fields', instruction: 'Set paragraph count or configure mock user profile fields.' },
      { step: 'Download or Copy', instruction: 'Copy formatted JSON, CSV, or SQL query statements to seed your database.' }
    ],
    faqs: [
      { question: 'Is this synthetic data safe for public tests?', answer: 'Yes, all generated names, emails, and phone numbers are completely synthetic and randomized.' }
    ]
  }
];
