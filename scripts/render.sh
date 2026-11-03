#!/usr/bin/env bash
# Renderiza un capítulo y deja un solo .mp4 con video y audio listo para Instagram.
#
# Uso: scripts/render.sh <composición> <nombre>
#   scripts/render.sh Cap04-ZanjaFrontera cap04-zanja-frontera
#
# Genera:
#   out/<nombre>.mp4        calidad completa
#   out/<nombre>-movil.mp4  liviano (< 30 MB) para subir desde el celular
#
# El audio se normaliza a -14 LUFS y se fija en 48 kHz: loudnorm sube la frecuencia internamente
# y un AAC a 96 kHz se reproduce mudo en muchos celulares. +faststart deja el índice al inicio
# para que el archivo se pueda reproducir mientras se descarga.
set -euo pipefail

comp="$1"
nombre="$2"
browser="${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}"
mkdir -p out

args=()
[ -x "$browser" ] && args+=(--browser-executable="$browser")
npx remotion render "$comp" "out/$nombre-raw.mp4" "${args[@]}"

ffmpeg -y -v error -i "out/$nombre-raw.mp4" -c:v copy \
  -af loudnorm=I=-14:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k -movflags +faststart "out/$nombre.mp4"
ffmpeg -y -v error -i "out/$nombre.mp4" -c:v libx264 -crf 27 -preset medium -pix_fmt yuv420p \
  -c:a copy -movflags +faststart "out/$nombre-movil.mp4"
rm "out/$nombre-raw.mp4"

for f in "out/$nombre.mp4" "out/$nombre-movil.mp4"; do
  echo "$f: $(ffprobe -v error -show_entries stream=codec_type,sample_rate -of csv=p=0 "$f" | tr '\n' ' ')"
done
