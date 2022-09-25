const requireAll = (requireContext) => requireContext.keys();
const req = require.context("@/icons/svg/", false, /\.svg$/);
const re = /\.\/(.*)\.svg/;
const svgIcons = requireAll(req).map((i) => {
    return i.match(re)[1]
});

export default svgIcons;