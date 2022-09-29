import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import focus from '@alpinejs/focus'
window.Alpine = Alpine
Alpine.plugin(intersect)
Alpine.plugin(focus)
Alpine.start()