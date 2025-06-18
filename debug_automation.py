#!/usr/bin/env python3
import subprocess
import time
import json
from datetime import datetime
import sys

DEBUG_OPTIONS = [
    {"name": "Testes Unitários", "command": ["npm", "test"]},
    {"name": "Linter (ESLint)", "command": ["npm", "run", "lint"]},
    {"name": "Build Verification", "command": ["npm", "run", "build"]},
    {"name": "Type Checking (se TS)", "command": ["npm", "run", "type-check"]},
    {"name": "Testes de Integração", "command": ["npm", "test", "--", "--coverage"]},
    {"name": "Dev Server Check", "command": ["npm", "run", "dev", "--", "--port=3000"]}
]

def run_debug_option(option):
    print(f"\n\033[1;34m▶ Executando: {option['name']}\033[0m")
    start_time = time.time()
    
    try:
        if "dev" in option["command"]:
            # Processo de longa duração em segundo plano
            process = subprocess.Popen(
                option["command"],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True
            )
            time.sleep(5)  # Tempo para o servidor iniciar
            process.terminate()
            return {
                "name": option["name"],
                "status": "success",
                "duration": time.time() - start_time
            }
        else:
            result = subprocess.run(
                option["command"],
                capture_output=True,
                text=True
            )
            return {
                "name": option["name"],
                "status": "success" if result.returncode == 0 else "failed",
                "output": result.stdout,
                "error": result.stderr,
                "duration": time.time() - start_time
            }
    except Exception as e:
        return {
            "name": option["name"],
            "status": "error",
            "error": str(e),
            "duration": time.time() - start_time
        }

def generate_report(results):
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    filename = f"debug_report_{timestamp}.json"
    
    report = {
        "timestamp": timestamp,
        "system": {
            "node": subprocess.run(["node", "-v"], capture_output=True, text=True).stdout.strip(),
            "npm": subprocess.run(["npm", "-v"], capture_output=True, text=True).stdout.strip(),
            "python": sys.version
        },
        "results": results
    }
    
    with open(filename, "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"\n\033[1;32m✓ Relatório gerado: {filename}\033[0m")
    return filename

def main():
    print("\033[1;36m=== Iniciando Automação de Debug ===\033[0m")
    results = []
    
    for option in DEBUG_OPTIONS:
        result = run_debug_option(option)
        results.append(result)
        
        if result["status"] == "success":
            print(f"\033[1;32m✓ {option['name']} - Sucesso ({result['duration']:.2f}s)\033[0m")
        else:
            print(f"\033[1;31m✗ {option['name']} - Falha ({result['duration']:.2f}s)\033[0m")
            if "error" in result:
                print(f"   Erro: {result['error']}")
    
    report_file = generate_report(results)
    
    # Resumo final
    print("\n\033[1;36m=== Resumo do Debug ===\033[0m")
    for result in results:
        status_icon = "✓" if result["status"] == "success" else "✗"
        color = "32" if result["status"] == "success" else "31"
        print(f"\033[1;{color}m{status_icon} {result['name']} ({result['duration']:.2f}s)\033[0m")
    
    print(f"\n\033[1;35mAutomação concluída. Verifique o relatório completo em {report_file}\033[0m")

if __name__ == "__main__":
    main()