import { UploadFileInfo } from 'naive-ui';
import { defineStore } from 'pinia';

import { LiveLineEnum, LiveRenderEnum, MediaTypeEnum } from '@/interface';
import { mobileRouterName } from '@/router';
import { ILiveRoom } from '@/types/ILiveRoom';

export type AppRootState = {
  version: string;
  workAreaSize: {
    width: number;
    height: number;
  };
  remoteDesk: Map<
    string,
    {
      sender: string;
      isClose: boolean;
      maxBitrate: number;
      maxFramerate: number;
      resolutionRatio: number;
      audioContentHint: string;
      videoContentHint: string;
    }
  >;
  playing: boolean;
  videoRatio: number;
  normalVolume: number;
  navList: { routeName: string; name: string }[];
  allTrack: {
    /** 1开启；2关闭 */
    audio: number;
    /** 1开启；2关闭 */
    video: number;
    id: string;
    deviceId?: string;
    mediaName: string;
    type: MediaTypeEnum;
    openEye: boolean;
    track?: MediaStreamTrack;
    stream?: MediaStream;
    streamid?: string;
    trackid?: string;
    // canvasDom?: fabric.Image | fabric.Text;
    canvasDom?: any;
    hidden?: boolean;
    muted?: boolean;
    volume?: number;
    videoEl?: HTMLVideoElement;
    imgInfo?: UploadFileInfo[];
    mediaInfo?: UploadFileInfo[];
    txtInfo?: { txt: string; color: string };
    timeInfo?: { color: string };
    stopwatchInfo?: { color: string };
    rect?: { top: number; left: number };
    scaleInfo: Record<number, { scaleX: number; scaleY: number }>;
  }[];
  videoControls: {
    pipMode?: boolean;
    pageFullMode?: boolean;
    fullMode?: boolean;
    renderMode?: LiveRenderEnum;
    line?: boolean;
    speed?: boolean;
    networkSpeed?: boolean;
    fps?: boolean;
    kbs?: boolean;
    resolution?: boolean;
  };
  videoControlsValue: {
    pipMode?: boolean;
    pageFullMode?: boolean;
    kbs?: string;
    fps?: number;
  };
  liveLine: LiveLineEnum;
  liveRoomInfo?: ILiveRoom;
  showLoginModal: boolean;
  disableSpeaking: Map<number, { exp: number; label: string }>;
  showSigninRedDot: boolean;
};

export const useAppStore = defineStore('app', {
  state: (): AppRootState => {
    return {
      version: '',
      workAreaSize: { width: 0, height: 0 },
      remoteDesk: new Map(),
      playing: false,
      videoRatio: 16 / 9,
      videoControls: {
        renderMode: LiveRenderEnum.video,
      },
      videoControlsValue: {
        pipMode: false,
      },
      normalVolume: 70,
      navList: [
        { routeName: mobileRouterName.h5, name: '频道' },
        { routeName: mobileRouterName.h5Rank, name: '排行' },
        { routeName: mobileRouterName.h5Profile, name: '我的' },
      ],
      allTrack: [],
      liveLine: LiveLineEnum.hls,
      liveRoomInfo: undefined,
      showLoginModal: false,
      disableSpeaking: new Map(),
      showSigninRedDot: false,
    };
  },
  actions: {
    setLiveRoomInfo(res: AppRootState['liveRoomInfo']) {
      this.liveRoomInfo = res;
    },
    setLiveLine(res: AppRootState['liveLine']) {
      this.liveLine = res;
    },
    setAllTrack(res: AppRootState['allTrack']) {
      this.allTrack = res;
    },
    getTrackInfo() {
      const res = { audio: 0, video: 0 };
      this.allTrack.forEach((item) => {
        // if (item.stream) {
        if (item.audio === 1) {
          res.audio += 1;
        }
        if (item.video === 1) {
          res.video += 1;
        }
        // }
      });
      return res;
    },
  },
});
