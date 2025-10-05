interface RestaurantSceneProps {
  scene: 'tavern' | 'castle' | 'throne';
}

export function RestaurantScene({ scene }: RestaurantSceneProps) {
  const getBackgroundImage = () => {
    switch (scene) {
      case 'tavern':
        return 'url(/images/Taverna1.gif)';
      case 'castle':
        return 'url(/images/Taverna2.gif)';
      case 'throne':
        return 'url(/images/Taverna1.gif)';
      default:
        return 'url(/images/Taverna1.gif)';
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