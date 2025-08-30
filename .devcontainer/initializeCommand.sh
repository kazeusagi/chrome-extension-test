# .envの作成
if [ ! -f .devcontainer/.env ]; then
    cp .devcontainer/.env.example .devcontainer/.env
fi

# .claudeディレクトリの作成
if [ ! -d .ccode/.claude ]; then
    mkdir -p .ccode/.claude
fi

# .claude.jsonの作成
if [ ! -f .ccode/.claude.json ]; then
    echo '{}' > .ccode/.claude.json
fi
