import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Welcome',
            component: () => import('../views/WelcomeView.vue')
        },
        {
            path: '/pin',
            name: 'Pin',
            component: () => import('../views/PinEntryView.vue')
        },
        {
            path: '/scan-id',
            name: 'ScanId',
            component: () => import('../views/IdScanView.vue')
        },
        {
            path: '/face-verify',
            name: 'FaceVerify',
            component: () => import('../views/FaceVerifyView.vue')
        },
        {
            path: '/complete',
            name: 'Complete',
            component: () => import('../views/CompleteView.vue')
        }
    ],
    
})
export default router