"""Busca voces en español chileno en la biblioteca de ElevenLabs y las agrega a tu cuenta.

Uso:
    ELEVENLABS_API_KEY=... python3 scripts/voces_elevenlabs.py buscar [acento] [genero]
    ELEVENLABS_API_KEY=... python3 scripts/voces_elevenlabs.py agregar <public_owner_id> <voice_id> <nombre>
    ELEVENLABS_API_KEY=... python3 scripts/voces_elevenlabs.py mias

Ejemplos:
    python3 scripts/voces_elevenlabs.py buscar chilean male
    python3 scripts/voces_elevenlabs.py agregar 3f2a... 9bX1... "Narrador chileno"

Después de agregarla, copia su voice_id en el campo "voz" de guion.json (con "motor": "elevenlabs").
"""

import json
import os
import sys
import urllib.parse
import urllib.request

API = "https://api.elevenlabs.io/v1"


def pedir(ruta: str, metodo: str = "GET", cuerpo: dict | None = None) -> dict:
    clave = os.environ.get("ELEVENLABS_API_KEY")
    if not clave:
        sys.exit("Falta la variable de entorno ELEVENLABS_API_KEY")
    datos = json.dumps(cuerpo).encode() if cuerpo is not None else None
    pedido = urllib.request.Request(
        f"{API}{ruta}", data=datos, method=metodo, headers={"xi-api-key": clave, "Content-Type": "application/json"}
    )
    with urllib.request.urlopen(pedido, timeout=60) as r:
        return json.load(r)


def buscar(acento: str = "chilean", genero: str | None = None) -> None:
    params = {"page_size": 30, "language": "es", "accent": acento, "sort": "usage_character_count_1y"}
    if genero:
        params["gender"] = genero
    voces = pedir(f"/shared-voices?{urllib.parse.urlencode(params)}").get("voices", [])
    if not voces:
        print(f"No encontré voces con acento '{acento}'. Prueba 'latin american' o sin género.")
    for v in voces:
        print(f"- {v.get('name')} · {v.get('gender')} · {v.get('age')} · acento {v.get('accent')}")
        print(f"  voice_id={v.get('voice_id')}  public_owner_id={v.get('public_owner_id')}")
        if v.get("description"):
            print(f"  {v['description'][:140]}")
        if v.get("preview_url"):
            print(f"  muestra: {v['preview_url']}")


def agregar(owner: str, voice_id: str, nombre: str) -> None:
    r = pedir(f"/voices/add/{owner}/{voice_id}", "POST", {"new_name": nombre})
    print("Agregada. voice_id para guion.json:", r.get("voice_id"))


def mias() -> None:
    for v in pedir("/voices").get("voices", []):
        etiquetas = v.get("labels") or {}
        print(f"- {v.get('name')} · {v.get('category')} · {etiquetas.get('accent', '')} · voice_id={v.get('voice_id')}")


if __name__ == "__main__":
    accion = sys.argv[1] if len(sys.argv) > 1 else "buscar"
    if accion == "buscar":
        buscar(*(sys.argv[2:4]))
    elif accion == "agregar":
        agregar(*sys.argv[2:5])
    else:
        mias()
