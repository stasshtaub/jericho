export default {
  setSettings: (state, settings) => {
    state.settings = settings;
  },
  addOutlet: (state, outlet) => {
    state.settings.outlets.push(outlet);
  }
};
