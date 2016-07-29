#! /usr/bin/env node

echo('Cleaning up dist directory');
rm('-rf', 'dist/*');

echo('Optmizing SVG icons');
exec('npm run svgo');

echo('Creating socialshares.js');
exec('npm run build');

echo('Copying socialshares.js and socialshares.js.map to dist');
cp('build/socialshares.js', 'dist/socialshares.js');
cp('build/socialshares.js.map', 'dist/socialshares.js.map');
sed('-i', '{VERSION}', env.npm_package_version, 'dist/socialshares.js');

echo('Creating socialshares.min.js');
exec('npm run build-min');

echo('Copying socialshares.min.js to dist');
cp('build/socialshares.js', 'dist/socialshares.min.js');
sed('-i', '{VERSION}', env.npm_package_version, 'dist/socialshares.min.js');

echo('Copying index.html to dist');
cp('build/index.html', 'dist/index.html');
sed('-i', './socialshares.js', './socialshares.min.js', 'dist/index.html');

echo('The dist directory is now ready!');
