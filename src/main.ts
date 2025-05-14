import './assets/scss/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ToastService from 'primevue/toastservice';
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Lara from '@primeuix/themes/lara';
import { definePreset } from '@primeuix/themes'
import KeyFilter from 'primevue/keyfilter';
import Tooltip from 'primevue/tooltip';
import centerText from './directives/centerText'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(ToastService)
const MyPreset = definePreset(Lara, {
	semantic: {
			primary: {
					50: '{blue.50}',
					100: '{blue.100}',
					200: '{blue.200}',
					300: '{blue.300}',
					400: '{blue.400}',
					500: '{blue.500}',
					600: '{blue.600}',
					700: '{blue.700}',
					800: '{blue.800}',
					900: '{blue.900}',
					950: '{blue.950}'
			}
	}
});
app.use(PrimeVue, {
	theme: {
		
		preset: MyPreset,
		options: {
			darkModeSelector: 'light',
		}
	}    
});

app.directive('tooltip', Tooltip);
app.directive('centerText', centerText)
app.directive('keyfilter', KeyFilter);
app.mount('#app')
