interface RestaurantSceneProps {
  scene: 'tavern' | 'castle' | 'throne';
}

export function RestaurantScene({ scene }: RestaurantSceneProps) {
  const getBackgroundImage = () => {
    switch (scene) {
      case 'tavern':
        return 'url(/images/Taverna.gif)';
      case 'castle':
        return 'url(/images/Taverna.gif)';
      case 'throne':
        return 'url(/images/Taverna.gif)';
      default:
        return 'url(/images/Taverna.gif)';
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