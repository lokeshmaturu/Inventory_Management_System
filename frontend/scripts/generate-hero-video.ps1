# Generates a hero video for the login page using ffmpeg
# Usage: Open PowerShell in the frontend directory and run: powershell -ExecutionPolicy Bypass -File .\scripts\generate-hero-video.ps1

$assetDir = "public/assets"
$srcDir = "$assetDir/hero-src"
$outputVideo = "$assetDir/hero.mp4"
$outputPoster = "$assetDir/hero-poster.jpg"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Host "ffmpeg not found. Install ffmpeg (https://ffmpeg.org/download.html) and ensure it's in PATH." -ForegroundColor Yellow
  exit 1
}

New-Item -ItemType Directory -Force -Path $srcDir | Out-Null

# Download a few royalty-free images (picsum) - replace with your own if you'd like
$images = @("https://picsum.photos/1280/720?random=101","https://picsum.photos/1280/720?random=102","https://picsum.photos/1280/720?random=103")

for ($i=0; $i -lt $images.Count; $i++) {
  $url = $images[$i]
  $dest = "$srcDir/slide$($i+1).jpg"
  Write-Host "Downloading $url -> $dest"
  Invoke-WebRequest -Uri $url -OutFile $dest -UseBasicParsing
}

# Create slides file list for ffmpeg concat
$slidesFile = "$srcDir/slides.txt"
$list = @()
for ($i=1; $i -le $images.Count; $i++) {
  $list += "file 'slide$i.jpg'"
  # duration in seconds
  $list += "duration 4"
}
# For concat demuxer, repeat last file without duration
$list += "file 'slide$($images.Count).jpg'"
$list -join "`n" | Out-File -Encoding utf8 $slidesFile

# Run ffmpeg to create a simple slideshow video
Write-Host "Creating video (this may take a few seconds)..."
$ffmpegArgs = "-y -f concat -safe 0 -i `"$slidesFile`" -vsync vfr -pix_fmt yuv420p `"$outputVideo`""

$proc = Start-Process -FilePath ffmpeg -ArgumentList $ffmpegArgs -NoNewWindow -Wait -PassThru
if ($proc.ExitCode -ne 0) {
  Write-Host "ffmpeg failed (exit code $($proc.ExitCode))." -ForegroundColor Red
  exit 1
}

# Create poster (use first slide)
Copy-Item -Path "$srcDir/slide1.jpg" -Destination $outputPoster -Force

Write-Host "Done. Video saved to $outputVideo" -ForegroundColor Green
Write-Host "Poster saved to $outputPoster" -ForegroundColor Green
Write-Host "Add or replace images in $srcDir and re-run this script to regenerate the video." -ForegroundColor Yellow
