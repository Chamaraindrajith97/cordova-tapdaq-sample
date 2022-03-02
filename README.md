# cordova-tapdaq-sample
Cordova Tapdaq Sample

Use tapdaq.js to your cordova application.
You have to only call thase functions to run ads.
```
app.showBanner();
app.showVideo();
app.showRewardedVideo();
app.destroyBanner();
```

Please change these:

```
android: {
      appId: "614f26fe08fe6c2d735d6e69", // edit
      clientKey: "626dbf08-5bc2-4785-92d1-c3d9b000dc7b", //edit
    },
    banner: {
      placementTag: "default", // edit
      bannerSize: "Standard", // edit
      bannerPosition: "bottom", //edit
    },
    video: {
      placementTag: "default", // edit
    },
    reward: {
      placementTag: "default", // edit
    },
  };
```
