const rules = [
  { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },
  { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline", resourceQuery: /url/ },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
          resourceQuery: { not: [/url/] },
        },
      },
      {
        loader: "file-loader",
        options: {
          name: "assets/[name].[contenthash].[ext]",
        },
      },
    ],
    issuer: {
      and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
    },
  },
];

module.exports = {
  rules,
};
