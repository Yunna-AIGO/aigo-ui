xcodebuild archive -project 'ios/MyApp.xcodeproj' -scheme MyApp -configuration Release -archivePath 'ios/build/archive/MyApp.xcarchive'
xcodebuild -exportArchive -archivePath 'ios/build/archive/MyApp.xcarchive' -exportPath 'ios/build/archive' -exportOptionsPlist 'ios/ExportOptions.plist'

curl -F "file=@ios/build/archive/MyApp.ipa" \
-F "uKey=1bcef405a847fd4bbda2a5f2d4ef8a75" \
-F "_api_key=a7e396162ae0d7c8dad361132f7fec52" \
https://www.pgyer.com/apiv2/app/upload

cd android && ./gradlew assembleRelease

curl -F "file=@app/build/outputs/apk/app-release.apk" \
-F "uKey=1bcef405a847fd4bbda2a5f2d4ef8a75" \
-F "_api_key=a7e396162ae0d7c8dad361132f7fec52" \
https://www.pgyer.com/apiv2/app/upload