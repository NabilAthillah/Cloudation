import { cookies } from 'next/headers';

const cookiesStore = cookies();
cookiesStore.delete('LoginSession');

window.location.href = '/'
