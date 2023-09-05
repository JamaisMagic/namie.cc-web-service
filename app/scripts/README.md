
# Some test scripts example

```bash
docker run --rm -it --network webnet jonlabelle/network-tools curl -v namie_cc_web_service:8010
docker run --rm -it --network webnet jonlabelle/network-tools curl -v namie_cc_web_service:8010/api/allowed_hostname/
docker run --rm -it --network webnet jonlabelle/network-tools curl -v namie_cc_web_service:8010/api-manage/delete-all/
docker run --rm -it --network webnet jonlabelle/network-tools curl -v namie_cc_web_service:8010/00000B
```
