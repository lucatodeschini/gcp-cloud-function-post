# Google Cloud Platform Cloud Function POST 

This project is a custom GitHub Action for send an authorized POST call to a GCP cloud function.

## Prerequisite

Before using this custom action you have to create a `key.json` file with the service account key.
The service account must have `Cloud Function Invoker` grant.

Use something like this:
```yaml
- run: echo "${{ secrets.CLOUD_FUNCTION_INVOKER }}" | base64 --decode > key.json
- name: GCP cloud function POST
```

## How to use it - Key/Value list feature

Adding the following snippet to your github action gives you the possibility to perform an HTTP POST.

```yaml
- name: GCP cloud function POST
        uses: lucatodeschini/gcp-cloud-function-post@v0.0.4
        id: gcp-cloud-function-post
        with:
          cloud_function_url: ${{ CLOUD_FUNCTION_URL }}
          key_value: |
            KEY1=VALUE1,
            KEY2=VALUE2,
            KEY3=VALUE3
```

Your cloud function:
```python
def message_listener(request):
    json_message = request.get_json(silent=True)
    print(json_message)
```

The cloud function will log:
```json
{
  "KEY1": "VALUE1",
  "KEY2": "VALUE2",
  "KEY3": "VALUE3",
  "timestamp": "2021-01-01 00:00:00"
}
```

## How to use it - Json message feature

Use this snippet to send a specific json message instead of a KEY/VALUE list.

```yaml
- name: GCP cloud function POST
        uses: lucatodeschini/gcp-cloud-function-post@v0.0.4
        id: gcp-cloud-function-post
        with:
          cloud_function_url: ${{ CLOUD_FUNCTION_URL }}
          json_body: { "KEY1": "VALUE1", "KEY2": "VALUE2", "KEY3": "VALUE3"}
```

Your cloud function:
```python
def message_listener(request):
    json_message = request.get_json(silent=True)
    print(json_message)
```

The cloud function will log:
```json
{
  "KEY1": "VALUE1",
  "KEY2": "VALUE2",
  "KEY3": "VALUE3",
  "timestamp": "2021-01-01 00:00:00"
}
```

## Overriding default timestamp

If you don't want to use the default timestamp you can override it, simply providing a `timestamp` field.

### KEY/VALUE list
```yaml
- name: GCP cloud function POST
        uses: lucatodeschini/gcp-cloud-function-post@v0.0.4
        id: gcp-cloud-function-post
        with:
          cloud_function_url: ${{ CLOUD_FUNCTION_URL }}
          key_value: |
            KEY1=VALUE1,
            KEY2=VALUE2,
            KEY3=VALUE3,
            timestamp=2031-01-01 00:00:00
```

### Json message
```yaml
- name: GCP cloud function POST
        uses: lucatodeschini/gcp-cloud-function-post@v0.0.4
        id: gcp-cloud-function-post
        with:
          cloud_function_url: ${{ CLOUD_FUNCTION_URL }}
          json_body: { "KEY1": "VALUE1", "KEY2": "VALUE2", "KEY3": "VALUE3", "timestamp": "2031-01-01 00:00:00"}
```

### Result
The cloud function will log:
```json
{
  "KEY1": "VALUE1",
  "KEY2": "VALUE2",
  "KEY3": "VALUE3",
  "timestamp": "2031-01-01 00:00:00"
}
```