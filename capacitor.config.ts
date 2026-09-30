export interface CapacitorConfig {
  appId: string
  appName: string
  webDir: string
  bundledWebRuntime?: boolean
  server?: {
    url?: string
    cleartext?: boolean
    androidScheme?: string
    iosScheme?: string
    allowNavigation?: string[]
  }
  plugins?: Record<string, unknown>
}

const config: CapacitorConfig = {
  appId: 'com.gtavihub.app',
  appName: 'GTA VI Hub',
  webDir: 'public',
  server: {
    androidScheme: 'https',
    url: 'https://gta6hub.com',
    cleartext: false,
    allowNavigation: ['gta6hub.com', '*.gta6hub.com'],
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#002b36',
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#002b36',
    },
  },
}

export default config
