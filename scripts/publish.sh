#!/bin/sh
PACKAGE_VERSION=$(node -p "require('./package.json').version")

echo "Current version is $PACKAGE_VERSION";
if [[ -z $(git status --porcelain) ]]; then
    yarn version --no-git-tag-version
    NEW_PACKAGE_VERSION=$(node -p "require('./package.json').version")

    echo "Building JS..."
    rimraf dist
    yarn run build

    echo "Packing to .crx..."
    yarn run build_crx

    echo "Committing the chages..."
    git add -A
    git commit -m "v$NEW_PACKAGE_VERSION"
    git tag v$NEW_PACKAGE_VERSION

    echo ""
    echo "Successfully packed version $NEW_PACKAGE_VERSION!"
else
    echo "Working tree is not clean! Commit your changes and then try again."
fi
