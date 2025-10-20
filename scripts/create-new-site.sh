#!/bin/bash

# 新しいECサイトを作成するスクリプト
# 使い方: ./scripts/create-new-site.sh <サイト名> <サイトタグ>
# 例: ./scripts/create-new-site.sh site2-project site2

set -e

# 引数チェック
if [ $# -ne 2 ]; then
  echo "使い方: $0 <新サイトディレクトリ名> <サイトタグ>"
  echo "例: $0 site2-project site2"
  exit 1
fi

NEW_SITE_DIR=$1
SITE_TAG=$2
CURRENT_DIR=$(pwd)

echo "🚀 新しいECサイトを作成します..."
echo "   サイトディレクトリ: $NEW_SITE_DIR"
echo "   サイトタグ: $SITE_TAG"
echo ""

# 1. 既存プロジェクトをコピー
echo "📁 プロジェクトファイルをコピー中..."
if [ -d "../$NEW_SITE_DIR" ]; then
  echo "❌ エラー: ../$NEW_SITE_DIR は既に存在します"
  exit 1
fi

cp -r . "../$NEW_SITE_DIR"
cd "../$NEW_SITE_DIR"

echo "✅ ファイルのコピー完了"
echo ""

# 2. .env.local を更新
echo "⚙️  環境変数を設定中..."
cat > .env.local << EOF
# Shopify Storefront API 設定
# 既存のErgogainサイトと同じTokenを使用してOK
NEXT_PUBLIC_SHOPIFY_DOMAIN=j0d0xu-n2.myshopify.com
NEXT_PUBLIC_STOREFRONT_TOKEN=a85ff6bbd70e1e4a97dcb3ea8c0c6c58

# マルチストア設定
NEXT_PUBLIC_SITE_TAG=$SITE_TAG
NEXT_PUBLIC_SITE_COLLECTION=${SITE_TAG}-store

# NextAuth設定（Google OAuth を使う場合）
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=https://yourdomain.com
EOF

echo "✅ .env.local を作成しました"
echo ""

# 3. package.json を更新
echo "📦 package.json を更新中..."
if [ -f "package.json" ]; then
  # macOS と Linux で互換性のある sed コマンド
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\"name\": \"ergogainvercel\"/\"name\": \"$NEW_SITE_DIR\"/" package.json
  else
    sed -i "s/\"name\": \"ergogainvercel\"/\"name\": \"$NEW_SITE_DIR\"/" package.json
  fi
  echo "✅ package.json を更新しました"
fi
echo ""

# 4. Git履歴を削除（オプション）
echo "🗑️  Git履歴をリセット中..."
rm -rf .git
git init
git add .
git commit -m "Initial commit for $SITE_TAG site"
echo "✅ Gitリポジトリを初期化しました"
echo ""

# 5. 次のステップを表示
echo "✅ 新しいサイトの作成が完了しました！"
echo ""
echo "📋 次のステップ:"
echo "   1. cd ../$NEW_SITE_DIR"
echo "   2. .env.local を編集して Shopify Storefront Token を設定"
echo "   3. app/globals.css で色変数を変更（ブランディング）"
echo "   4. app/layout.tsx でサイト名を変更"
echo "   5. Shopify管理画面で商品に '$SITE_TAG' タグを追加"
echo "   6. npm install && npm run dev でローカル起動"
echo "   7. Vercel にデプロイ"
echo ""
echo "📚 詳細は MULTISTORE_DESIGN.md を参照してください"
