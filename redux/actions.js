export const setAds = (ads) => {
  return {
    type: 'SET_ADS',
    payload: ads,
  };
};

export const addAd = (ad) => ({
  type: 'ADD_AD',
  payload: ad,
});

export const updateAd = (ad) => ({
  type: 'UPDATE_AD',
  payload: ad,
});

export const deleteAd = (adId) => ({
  type: 'DELETE_AD',
  payload: adId,
});
