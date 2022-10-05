const tg = window.Telegram.WebApp;

export const useTelegram = () => {
  const onClose = () => tg.close();

  const onToggleButton = () =>
    tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show();

  return {
    tg,
    onClose,
    onToggleButton,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
  };
};
