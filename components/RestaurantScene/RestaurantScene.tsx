interface RestaurantSceneProps {
  scene: 'tavern' | 'castle' | 'throne';
}

export function RestaurantScene({ scene }: RestaurantSceneProps) {
  const getBackgroundImage = () => {
    switch (scene) {
      case 'tavern':
        return 'url(https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif)';
      case 'castle':
        return 'url(https://media.giphy.com/media/xT5LMHxhOfscxPfIfm/giphy.gif)';
      case 'throne':
        return 'url(https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif)';
      default:
        return 'url(https://media.giphy.com/media/l0Exk8EHvG3U8nWak/giphy.gif)';
    }
  };

  return (
    <>
      <div 
        className="scene" 
        style={{ backgroundImage: getBackgroundImage() }}
      ></div>
      <div className="overlay"></div>
    </>
  );
}