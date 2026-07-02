import os
from PIL import Image

def process_images_in_place(root_folder, max_size=(1024, 1024), quality=85):
    """
    Przeszukuje folder oraz wszystkie jego podfoldery, modyfikuje grafiki w miejscu
    (nadpisuje je) zmniejszając rozmiar i usuwając metadane.
    """
    # Obsługiwane rozszerzenia plików
    valid_extensions = {".jpg", ".jpeg", ".png", ".webp"}
    
    counter_success = 0
    counter_error = 0

    # os.walk automatycznie wchodzi do wszystkich podfolderów
    for dirpath, _, filenames in os.walk(root_folder):
        for filename in filenames:
            ext = os.path.splitext(filename)[1].lower()
            
            if ext in valid_extensions:
                # Tworzymy pełną ścieżkę do pliku w jego aktualnym podfolderze
                file_path = os.path.join(dirpath, filename)
                
                try:
                    with Image.open(file_path) as img:
                        # 1. Sprawdzenie wymiarów - jeśli obraz jest już mniejszy niż max_size,
                        # thumbnail() go nie powiększy, ale i tak zachowa proporcje jeśli jest większy.
                        img.thumbnail(max_size, Image.Resampling.LANCZOS)

                        # 2. Usunięcie metadanych poprzez stworzenie nowego "czystego" obrazu
                        clean_img = Image.new(img.mode, img.size)
                        clean_img.paste(img)
                        
                        # Zamykamy plik wejściowy przed zapisem, aby uniknąć problemów z uprawnieniami w niektórych OS
                        img.close()

                        # 3. Nadpisanie oryginalnego pliku z optymalizacją
                        clean_img.save(file_path, optimize=True, quality=quality)
                        
                        print(f"✅ Przetworzono w miejscu: {file_path}")
                        counter_success += 1
                        
                except Exception as e:
                    print(f"❌ Błąd przy pliku {file_path}: {e}")
                    counter_error += 1

    print("\n==========================================")
    print(f"Podsumowanie: Przetworzono poprawnie: {counter_success}, Błędy: {counter_error}")
    print("==========================================")

# ==========================================
# Uruchomienie skryptu
# ==========================================
if __name__ == "__main__":
    # Wpisz tutaj ścieżkę do głównego folderu swojej strony.
    # Jeśli skrypt znajduje się w tym samym folderze co strona, możesz wpisać "." (kropkę)
    FOLDER_STRONY = "E:\Currently working on\Current Website\src"
    
    print("Rozpoczynam przeszukiwanie i optymalizację grafik w miejscu...")
    # max_size=(1200, 1200) oznacza, że żaden bok zdjęcia nie przekroczy 1200px
    process_images_in_place(FOLDER_STRONY, max_size=(1200, 1200), quality=82)
    print("Zakończono!")