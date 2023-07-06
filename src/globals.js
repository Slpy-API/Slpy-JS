export let mapState = {
    maplibreLoaded: false,
    openlayersLoaded: false,
    openlayersLoading: false,
    openlayersReady: undefined,
    mapStyleUrl: process.env.API_URL + ".slpy.com/style/slpy-mgl-style.json",
    oldIE: false,
    aerialImageryOn: false,
    streetLevelOn: false,
};

export let settings = {
    openlayersFallback: false,
    rasterFallback: false,
    mapFilter: [],
    apiKey: ""
};

export let openlayersParts = {
    view: {},
    controls: {},
    interactions: {},
};

export let mapLibraries = {
    ol: undefined,
    olms: undefined,
    maplibregl: undefined
}