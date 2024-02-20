import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css'; // choose your theme

toastConfig({ 
  theme: 'dark',
  position: 'center',
});

export {
  toast
}
