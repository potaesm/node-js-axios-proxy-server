# heroku ps:socks
Launch a SOCKS proxy into a dyno

## USAGE
```bash
heroku ps:socks
```

## OPTIONS
*  -a, --app=app        (required) app to run command against
*  -d, --dyno=dyno      specify the dyno to connect to
*  -r, --remote=remote  git remote of app to use

## DESCRIPTION
* Example:
  ```bash
  heroku ps:socks --app suthinan-proxy
  ```
  ```bash
  Establishing credentials... done
  SOCKSv5 proxy server started on port 1080
  Use CTRL+C to stop the proxy
  ```
## Spotify Proxy
```bash
nano ~/Library/Application Support/Spotify/prefs
```
```bash
...
network.proxy.addr="127.0.0.1:1080@socks5"
network.proxy.mode=4
...
```
* Spotify_Proxy.command
  ```bash
  sed -i -e 's/network.proxy.mode=1/network.proxy.mode=4/g' ~/Library/Application\ Support/Spotify/prefs
  sed -i -e 's/network.proxy.mode=2/network.proxy.mode=4/g' ~/Library/Application\ Support/Spotify/prefs
  sed -i -e 's/network.proxy.mode=3/network.proxy.mode=4/g' ~/Library/Application\ Support/Spotify/prefs
  while true; do curl https://suthinan-proxy.herokuapp.com/ && heroku ps:socks --app suthinan-proxy && break; done
  ```
