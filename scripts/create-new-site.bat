@echo off
REM 新しいECサイトを作成するスクリプト (Windows版)
REM 使い方: scripts\create-new-site.bat <サイト名> <サイトタグ>
REM 例: scripts\create-new-site.bat site2-project site2

if "%~2"=="" (
    echo 使い方: %0 ^<新サイトディレクトリ名^> ^<サイトタグ^>
    echo 例: %0 site2-project site2
    exit /b 1
)

set NEW_SITE_DIR=%1
set SITE_TAG=%2

echo 🚀 新しいECサイトを作成します...
echo    サイトディレクトリ: %NEW_SITE_DIR%
echo    サイトタグ: %SITE_TAG%
echo.

REM 1. 既存プロジェクトをコピー
echo 📁 プロジェクトファイルをコピー中...
if exist "..\%NEW_SITE_DIR%" (
    echo ❌ エラー: ..\%NEW_SITE_DIR% は既に存在します
    exit /b 1
)

xcopy /E /I /Q . "..\%NEW_SITE_DIR%" >nul
cd "..\%NEW_SITE_DIR%"

echo ✅ ファイルのコピー完了
echo.

REM 2. .env.local を作成
echo ⚙️  環境変数を設定中...
(
echo # Shopify Storefront API 設定
echo # 既存のErgogainサイトと同じTokenを使用してOK
echo NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
echo NEXT_PUBLIC_STOREFRONT_TOKEN=a85ff6bbd70e1e4a97dcb3ea8c0c6c58
echo.
echo # マルチストア設定
echo NEXT_PUBLIC_SITE_TAG=%SITE_TAG%
echo NEXT_PUBLIC_SITE_COLLECTION=%SITE_TAG%-store
echo.
echo # NextAuth設定（Google OAuth を使う場合）
echo GOOGLE_CLIENT_ID=
echo GOOGLE_CLIENT_SECRET=
echo NEXTAUTH_SECRET=
echo NEXTAUTH_URL=https://yourdomain.com
) > .env.local

echo ✅ .env.local を作成しました
echo.

REM 3. package.json を更新
echo 📦 package.json を更新中...
if exist "package.json" (
    powershell -Command "(Get-Content package.json) -replace '\"name\": \"ergogainvercel\"', '\"name\": \"%NEW_SITE_DIR%\"' | Set-Content package.json"
    echo ✅ package.json を更新しました
)
echo.

REM 4. Git履歴を削除（オプション）
echo 🗑️  Git履歴をリセット中...
if exist ".git" rmdir /S /Q .git
git init
git add .
git commit -m "Initial commit for %SITE_TAG% site"
echo ✅ Gitリポジトリを初期化しました
echo.

REM 5. 次のステップを表示
echo ✅ 新しいサイトの作成が完了しました！
echo.
echo 📋 次のステップ:
echo    1. cd ..\%NEW_SITE_DIR%
echo    2. .env.local を編集して Shopify Storefront Token を設定
echo    3. app\globals.css で色変数を変更（ブランディング）
echo    4. app\layout.tsx でサイト名を変更
echo    5. Shopify管理画面で商品に '%SITE_TAG%' タグを追加
echo    6. npm install ^&^& npm run dev でローカル起動
echo    7. Vercel にデプロイ
echo.
echo 📚 詳細は MULTISTORE_DESIGN.md を参照してください
