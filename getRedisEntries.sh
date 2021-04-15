for key in $(redis-cli -p 6379 keys \*)
  do echo "chave : '$key'" 
done