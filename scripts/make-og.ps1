Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$srcPath = Join-Path $root 'public\detective\hien-truong-2158.jpg'
$outPath = Join-Path $root 'public\og.jpg'

$src = [System.Drawing.Image]::FromFile($srcPath)
$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$dstRatio = $w / $h
$srcRatio = $src.Width / $src.Height
if ($srcRatio -gt $dstRatio) {
  $cropH = $src.Height
  $cropW = [int]($src.Height * $dstRatio)
} else {
  $cropW = $src.Width
  $cropH = [int]($src.Width / $dstRatio)
}
$cropX = [int](($src.Width - $cropW) / 2)
$cropY = [int](($src.Height - $cropH) / 2)

$dest = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
$g.DrawImage($src, $dest, $cropX, $cropY, $cropW, $cropH, [System.Drawing.GraphicsUnit]::Pixel)

$overlay = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(38, 5, 5, 11))
$g.FillRectangle($overlay, $dest)

$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)

$g.Dispose()
$bmp.Dispose()
$src.Dispose()

Write-Output ("og.jpg: {0} bytes" -f (Get-Item $outPath).Length)
