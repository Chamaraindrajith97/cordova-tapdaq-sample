/*
<button onclick="app.showBanner();">showBanner</button>
<button onclick="app.showVideo();">showVideo</button>
<button onclick="app.showRewardedVideo();">showRewardedVideo</button>
<button onclick="app.destroyBanner();">destroyBanner</button>
*/

const config = {
    android: {
      appId: "", // edit
      clientKey: "", //edit
    },
    banner: {
      placementTag: "default", // edit
      bannerSize: "smart", // edit
      bannerPosition: "bottom", //edit
    },
    video: {
      placementTag: "default", // edit
    },
    reward: {
      placementTag: "default", // edit
    },
  };
  
  var bannerRefreshRate = 30001; //edit
  var videoRefreshRate = 60000; //edit
  var rewardRefreshRate = 60000; //edit
  var faildAdRefreshRate = 30001; //edit
  
  var app = {
    initialize: function () {
      document.addEventListener(
        "deviceready",
        this.onDeviceReady.bind(this),
        false
      );
    },
  
    /**
     * onDeviceReady
     */
    onDeviceReady: function () {
      /**
       * vConsole
       */
      var vConsole = new window.VConsole();
  
      /**
       * Tapdaq init
       */
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      var opts = {
        didInitialise: function () {
          console.log("cb: didInitialise");
          Tapdaq.networkStatuses(function (value) {
            console.log("Network Statuses: " + JSON.stringify(value));
          });
          app.loadBanner();
          app.loadVideo();
          app.loadRewardedVideo();
        },
        didFailToInitialise: function (error) {
          console.log("cb: didFailToInitialise: " + JSON.stringify(error));
        },
      };
      Tapdaq.init(config, opts);
    },
    loadAd: function (type) {
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      const loadOpts = {
        didLoad: function (response) {
          console.log("didLoad: " + JSON.stringify(response));
        },
        didFailToLoad: function (error, response) {
          console.log(
            "didFailToLoad: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
          app.startTimer(type, true);
        },
      };
      const bannerOpts = {
        didLoad: function (response) {
          console.log("didLoad: " + JSON.stringify(response));
          app.showBanner();
        },
        didFailToLoad: function (error, response) {
          console.log(
            "didFailToLoad: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
          app.startTimer("banner", true);
        },
        didRefresh: function (response) {
          console.log("didRefresh: " + JSON.stringify(response));
        },
        didFailToRefresh: function (error, response) {
          console.log(
            "didFailToRefresh: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
          app.destroyBanner();
        },
        didClick: function (response) {
          console.log("didClick: " + JSON.stringify(response));
        },
      };
      switch (type) {
        case "banner":
          Tapdaq.loadBanner(
            config.banner.placementTag,
            config.banner.bannerSize,
            bannerOpts
          );
          break;
        case "video":
          Tapdaq.loadVideo(config.video.placementTag, loadOpts);
          break;
        case "reward":
          Tapdaq.loadRewardedVideo(config.reward.placementTag, loadOpts);
          break;
        default:
          console.log("loadAd type none of banner, video, reward");
          break;
      }
    },
    showAd: function (type) {
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      const showOpts = {
        willDisplay: function (response) {
          console.log("willDisplay: " + JSON.stringify(response));
        },
        didDisplay: function (response) {
          console.log("didDisplay: " + JSON.stringify(response));
          if (type == "video" || type == "reward") {
            app.startTimer(type, false);
          }
        },
        didFailToDisplay: function (error, response) {
          console.log(
            "didFailToDisplay: error: " +
              JSON.stringify(error) +
              ", response: " +
              JSON.stringify(response)
          );
        },
        didClose: function (response) {
          console.log("didClose: " + JSON.stringify(response));
        },
        didClick: function (response) {
          console.log("didClick: " + JSON.stringify(response));
        },
        didValidateReward: function (response) {
          console.log("didValidateReward: " + JSON.stringify(response));
        },
      };
      switch (type) {
        case "banner":
          Tapdaq.showBanner(
            config.banner.placementTag,
            config.banner.bannerPosition
          );
          break;
        case "video":
          Tapdaq.showVideo(config.video.placementTag, showOpts);
          break;
        case "reward":
          Tapdaq.showRewardedVideo(config.reward.placementTag, showOpts);
          break;
        default:
          console.log("showAd type none of banner, video, reward");
          break;
      }
    },
    loadBanner: function () {
      app.loadAd("banner");
    },
    loadVideo: function () {
      app.loadAd("video");
    },
    loadRewardedVideo: function () {
      app.loadAd("reward");
    },
    showBanner: function () {
      app.showAd("banner");
    },
    showVideo: function () {
      app.showAd("video");
    },
    showRewardedVideo: function () {
      app.showAd("reward");
    },
    destroyBanner: function () {
      const Tapdaq = cordova.require("cordova-plugin-tapdaq.Tapdaq");
      Tapdaq.hideBanner(config.video.placementTag);
      Tapdaq.destroyBanner(config.video.placementTag);
      app.startTimer("banner", true);
    },
    startTimer: function (type, faild) {
      var adTime = 30000;
      if (faild == true) {
        adTime = faildAdRefreshRate;
      } else {
        switch (type) {
          case "banner":
            adTime = bannerRefreshRate;
            break;
          case "video":
            adTime = videoRefreshRate;
            break;
          case "reward":
            adTime = rewardRefreshRate;
            break;
          default:
            break;
        }
      }
      setTimeout(() => {
        switch (type) {
          case "banner":
            app.loadBanner();
            break;
          case "video":
            app.loadVideo();
            break;
          case "reward":
            app.loadRewardedVideo();
            break;
          default:
            break;
        }
      }, adTime);
    },
  };
  app.initialize();
  