# ===============================================================
# Increase version in both package.json and the Workspace WebView
# ===============================================================

if [ -z $1 ]
then
  echo "Unable to continue, no version provided."
  echo "Please provide a major.minor.patch version number when running."
  exit 1
fi

FILE_PATH_WV=./src/webviews/Workspace/WorkspaceViewProvider.ts
FILE_PATH_PKGJSON=./package.json

echo "Changing version to: '$1'"

sed -i "s%  private readonly _version: string.*%  private readonly _version: string = '$1'%" "$FILE_PATH_WV"
sed -i "s%  \"version\":.*%  \"version\": \"$1\"\,%" "$FILE_PATH_PKGJSON"