#! /usr/bin/env node

/**
 * Cleanup / Optimize
 */

echo('Cleaning up dist directory')
rm('-rf', 'dist')
mkdir('dist')

echo('Optimizing SVG icons')
exec('npm run svgo')

/**
 * Build Socialshares: With Icons
 */

echo('Creating socialshares.js')
exec('npm run build')

echo('Copying socialshares.js and socialshares.js.map to dist')
cp('build/socialshares.js', 'dist/socialshares.js')
cp('build/socialshares.js.map', 'dist/socialshares.js.map')
sed('-i', '{VERSION}', env.npm_package_version, 'dist/socialshares.js')

echo('Creating socialshares.min.js')
exec('npm run build-min')

echo('Copying socialshares.min.js to dist')
cp('build/socialshares.js', 'dist/socialshares.min.js')
sed('-i', '{VERSION}', env.npm_package_version, 'dist/socialshares.min.js')

/**
 * Build Socialshares: Without Icons
 */

echo('Creating socialshares.js without icons')
exec('npm run build --  --exclude-icons')

echo('Copying socialshares.js and socialshares.js.map to dist')
cp('build/socialshares.js', 'dist/socialshares.noicons.js')
cp('build/socialshares.js.map', 'dist/socialshares.noicons.js.map')
sed('-i', '{VERSION}', env.npm_package_version, 'dist/socialshares.noicons.js')
sed('-i', 'socialshares.js.map', 'socialshares.noicons.js.map', 'dist/socialshares.noicons.js')

echo('Creating socialshares.min.js without icons')
exec('npm run build-min --  --exclude-icons')

echo('Copying socialshares.min.js to dist')
cp('build/socialshares.js', 'dist/socialshares.noicons.min.js')
sed('-i', '{VERSION}', env.npm_package_version, 'dist/socialshares.noicons.min.js')

/**
 * Build Icons
 */

echo('Creating icons')
exec('npm run build-icons')

echo('Copying icons to dist')
cp('-r', 'build/icons/', 'dist/icons/')

/**
 * HTML Demo
 */

echo('Copying index.html to dist')
cp('build/index.html', 'dist/index.html')
sed('-i', './socialshares.js', './socialshares.min.js', 'dist/index.html')

/**
 * Done
 */

echo('The dist directory is now ready!')
