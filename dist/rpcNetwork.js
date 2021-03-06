import RpcQuery from "./rpcQuery.js";
// @ts-ignore
import DHT from "@hyperswarm/dht";
export default class RpcNetwork {
    constructor(dht = new DHT()) {
        this._dht = dht;
        this._ready = this._dht.ready();
    }
    _dht;
    get dht() {
        return this._dht;
    }
    _majorityThreshold = 0.75;
    get majorityThreshold() {
        return this._majorityThreshold;
    }
    set majorityThreshold(value) {
        this._majorityThreshold = value;
    }
    _maxTtl = 12 * 60 * 60;
    get maxTtl() {
        return this._maxTtl;
    }
    set maxTtl(value) {
        this._maxTtl = value;
    }
    _queryTimeout = 30;
    get queryTimeout() {
        return this._queryTimeout;
    }
    set queryTimeout(value) {
        this._queryTimeout = value;
    }
    _relayTimeout = 2;
    get relayTimeout() {
        return this._relayTimeout;
    }
    set relayTimeout(value) {
        this._relayTimeout = value;
    }
    _relays = [];
    get relays() {
        return this._relays;
    }
    _ready;
    get ready() {
        return this._ready;
    }
    _force = false;
    get force() {
        return this._force;
    }
    set force(value) {
        this._force = value;
    }
    addRelay(pubkey) {
        this._relays.push(pubkey);
        this._relays = [...new Set(this._relays)];
    }
    removeRelay(pubkey) {
        if (!this._relays.includes(pubkey)) {
            return false;
        }
        delete this._relays[this._relays.indexOf(pubkey)];
        this._relays = Object.values(this._relays);
        return true;
    }
    clearRelays() {
        this._relays = [];
    }
    query(query, chain, data = {}, force = false) {
        return new RpcQuery(this, {
            query,
            chain,
            data,
            force: force || this._force,
        });
    }
}
