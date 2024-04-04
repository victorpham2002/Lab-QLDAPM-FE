import { ConfigProvider } from 'antd';

const AntdConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = {
    token: {
      colorPrimary: '#301eb1',
      colorInfo: '#301eb1',
      colorError: '#ef4444',
      colorSuccess: '#22c55e',
      colorWarning: '#eab308',
      colorText: 'var(--mantine-color-text)',
      colorIconHover: 'var(--mantine-color-text)',
      colorTextHeading: 'var(--mantine-color-text)',
      fontFamily: 'var(--edtronaut-font-family)',
      fontSize: 14,
      fontSizeLG: 14,
      fontSizeSM: 14,
      fontSizeXL: 16,
      controlHeightLG: 36,
      controlHeightSM: 28,
      controlHeightXS: 24,
      screenXS: 512,
      screenXSMax: 639,
      screenXSMin: 512,
      screenSM: 640,
      screenSMMax: 767,
      screenSMMin: 640,
      screenMD: 768,
      screenMDMax: 1023,
      screenMDMin: 768,
      screenLG: 1024,
      screenLGMax: 1279,
      screenLGMin: 1024,
      screenXL: 1280,
      screenXLMax: 1535,
      screenXLMin: 1280,
      screenXXL: 1536,
      screenXXLMin: 1536,
    },
    components: {
      Button: {
        contentFontSize: 14,
        contentFontSizeLG: 14,
        contentFontSizeSM: 14,
      },
      Divider: {
        colorText: 'rgba(128, 128, 128, 0.88)',
        colorSplit: 'rgba(225, 225, 225, 0.94)',
      },
      Select: {
        colorFillSecondary: 'rgba(209, 236, 255, 0.94)',
      },
      Drawer: {
        lineWidth: 0,
        colorBgElevated: '#2C2C2C',
        colorText: '#fff',
      },
      // Input: {
      //   colorBgContainer: '#EEE',
      // },
    },
  };
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default AntdConfigProvider;
