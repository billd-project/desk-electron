import { defineStore } from 'pinia';

import { WebRTCClass } from '@/utils/network/webRTC';
import { WebSocketClass } from '@/utils/network/webSocket';

type NetworkRootState = {
  wsMap: Map<string, WebSocketClass>;
  rtcMap: Map<string, WebRTCClass>;
};

export const useNetworkStore = defineStore('network', {
  state: (): NetworkRootState => {
    return {
      wsMap: new Map(),
      rtcMap: new Map(),
    };
  },
  actions: {
    updateWsMap(roomId: string, arg) {
      const val = this.wsMap.get(roomId);
      if (val) {
        this.wsMap.set(roomId, { ...val, ...arg });
      } else {
        this.wsMap.set(roomId, arg);
      }
    },
    removeWs(roomId: string) {
      const old = this.wsMap.get(roomId);
      if (old) {
        old.close();
      }
      this.wsMap.delete(roomId);
    },
    removeRtc(socketId: string) {
      const old = this.rtcMap.get(socketId);
      console.log(old, 'old');
      if (old) {
        old.close();
      }
      this.rtcMap.delete(socketId);
    },
    removeAllWsAndRtc() {
      this.wsMap.forEach((item) => {
        item.close();
      });
      this.rtcMap.forEach((item) => {
        item.close();
      });
      this.wsMap.clear();
      this.rtcMap.clear();
    },
    removeAllRtc() {
      this.rtcMap.forEach((item) => {
        console.log('item', item.receiver, item.sender);
        item.close();
      });
      this.rtcMap.clear();
    },
    removeAllWs() {
      this.wsMap.forEach((item) => {
        item.close();
      });
      this.wsMap.clear();
    },
  },
});
