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
