@echo off
mode 999
title Uruchamianie bota 
IF EXIST komendy (
title  Trwa uruchamianie bota...
) ELSE (
title Znaleziono blad...
echo.Sprawdz czy folder komendy istnieje
set /p potwierdzenie:=
pause
exit
)

IF EXIST index.js (
    title Trwa uruchamianie bota...
) ELSE (
    title Znaleziono blad, index.js
    echo.Nie widze pliku glownego
    set /p potwierdzenie
    pause
    exit
    )



    echo.Trwa uruchamianie bota...
    node index.js
    pause
