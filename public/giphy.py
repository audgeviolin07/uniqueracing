from PIL import Image

def extract_first_frame(gif_path, output_path):
    # Open the GIF file
    with Image.open(gif_path) as img:
        img.seek(0)
        # Save the first frame as an image
        img.save(output_path, format='PNG')

if __name__ == '__main__':
    gif_path = 'giphy-background.webp'  # Replace with your GIF path
    output_path = 'giphy_frame.png'  # Replace with your desired output path
    
    extract_first_frame(gif_path, output_path)
    print(f"First frame extracted and saved to {output_path}")
