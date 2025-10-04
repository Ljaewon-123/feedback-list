import type { ToastServiceMethods } from "primevue/toastservice";

export const sharePublicLink = async (toast: ToastServiceMethods) => {
  const url = window.location.href;
  
  // Web Share API 지원 확인
  if (navigator.share) {
    try {
      await navigator.share({
        title: '페이지 제목',
        text: '이 페이지를 확인해보세요!',
        url: url
      });
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    }
  } else {
    // 지원하지 않으면 클립보드 복사로 폴백
    await navigator.clipboard.writeText(url);
    toast.add({ 
      severity: 'success', 
      summary: 'Copied to clipboard', 
      life: 3000 
    });
  }
}