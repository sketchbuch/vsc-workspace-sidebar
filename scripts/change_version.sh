# =========================================================
# Increase version in both package.json and some other file
# =========================================================

# I needed to update the version in package.json and in a typescript class.
# Version in class is used to check if caches need dropping
# Didn't want to include package.json in the typescript class as this would have added the whole package.json to the dist bundle
# So I created this script to update both.
# Will exit if no version provided, but no check is made if the format of the version is correct.

if [ -z $1 ]
then
  echo "Unable to continue, no version provided."
  echo "Please provide a version number when running."
  exit 1
fi

FILE_PATH_1=./src/webviews/Workspace/WorkspaceViewProvider.ts
FILE_PATH_2=./package.json

echo "Changing version to: '$1'"

sed -i "s%  private readonly _version: string.*%  private readonly _version: string = '$1'%" "$FILE_PATH_1"
sed -i "s%  \"version\":.*%  \"version\": \"$1\"\,%" "$FILE_PATH_2"
