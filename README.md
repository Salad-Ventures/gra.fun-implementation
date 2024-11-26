# gra.fun Token Launch Implementation

This implementation handles the automatic form population when users launch their meme coins from gra.fun to the token launch page.

## How It Works

When a user clicks the "Launch on gra.fun" button on memeOS, they are redirected to `gra.fun/launch-token` with URL parameters containing their meme coin details:

### Example URL with parameters

`https://gra.fun/launch-token?name=AbsurdApocalypse&symbol=LOLZ&description=Dive%20into%20the%20realm%20of%20existential%20wackiness,%20where%20chaos%20reigns%20and%20memes%20ponder%20their%20existence!&image=https://dev-meme-coin-images.s3.ap-southeast-1.amazonaws.com/meme-coins/absurdapocalypse-1732588507479.png`

### URL Parameters

- `name`: The name of the meme coin
- `symbol`: The token symbol
- `description`: A description of the meme coin (URL encoded)
- `image`: URL to the meme coin's image

### Automatic Form Population

The script automatically:

1. Extracts parameters from the URL
2. Populates form fields with the corresponding values:
   - Token name → `#token-name`
   - Token symbol → `#token-symbol`
   - Description → `#token-description`
3. Downloads and uploads the image to the file input field

## Implementation Details

### Parameter Extraction

```javascript
function getUrlParams(url) {
  const params = new URL(url).searchParams;
  return {
    name: params.get("name"),
    symbol: params.get("symbol"),
    description: params.get("description"),
    image: params.get("image"),
  };
}
```

## Example Flow

1. User creates a meme coin on memeOS
2. Clicks "Launch on gra.fun" button
3. Redirects to launch page with parameters
4. Script automatically populates:
   - Name: "AbsurdApocalypse"
   - Symbol: "LOLZ"
   - Description: "Dive into the realm..."
   - Image: Uploads from provided URL

## Demo

> 🎥 **Watch how it works:** [View Demo](https://www.loom.com/share/4397701538d74e44b22979bc36b2f781?sid=2d4f910a-a0e5-4457-bd0c-394dfed3552e)

## Error Handling

The implementation includes error handling for:

- Missing form fields
- Failed image uploads
- Invalid URL parameters
- Network issues during image fetch

## Usage

Simply include the script on the launch token page:

```html
<script src="script.js"></script>
```

The form population will happen automatically when the page loads with the appropriate URL parameters.
