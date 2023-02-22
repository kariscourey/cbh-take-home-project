const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  // check event with partitionkey
  it("Returns non-trivial hash when given non-trivial input", () => {
    const testEvent = {
      paritionKey: 'test',
    };
    const nonTrivialKey = deterministicPartitionKey(testEvent);
    const nonTrivialHash = 'b8f8f38ae6aeb4b105053e6e38fde4d55c4685a7e6e8a7ef5da25f4058db1d6a00ae3c8945e7a9c942eaa1e36931b0d6546c42bb8f30cf1255005989b44d8d86';
    expect(nonTrivialKey).toBe(nonTrivialHash);
  });

  // check event without partitionkey
  it("Returns no-key hash when given event with no paritionKey attribute", () => {
    const testEvent = {};
    const noKey = deterministicPartitionKey(testEvent);
    const noKeyHash = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862';
    expect(noKey).toBe(noKeyHash);
  });

  // check event with empty partitionkey
  it("Returns empty-key hash when given event with an empty string paritionKey attribute", () => {
    const testEvent = {
      paritionKey: '',
    };
    const emptyKey = deterministicPartitionKey(testEvent);
    const emptyKeyHash = '08c4f5d51d0cb280b6ade6d4e4bc5bf699d58d0007a1b522cbc5195116676d8edd4130cbd55e52b0d975c0715d17b799505d6feb0c907d576dd97d339c07b349';
    expect(emptyKey).toBe(emptyKeyHash);
  });

  // check key (candidate) not string
  it("Returns non-string hash when given event with non-string paritionKey attribute", () => {
    const testEvent = {
      paritionKey: 123,
    };
    const nonStringKey = deterministicPartitionKey(testEvent);
    const nonStringKeyHash = '5ad36c4bd101fd5a98ea22695b130506eb5d1538f6f1b5566f548240a7db91fce3e609eb1680ec46da008329b208b39aa5d5b63e3cc14d3d9b2f17d812101343';
    expect(nonStringKey).toBe(nonStringKeyHash);
  });

  // check candidate length = MAX_PART...
  it("Returns max-length-key hash when given event with max-length paritionKey attribute", () => {
    const testEvent = {
      paritionKey: 'hello, hello, there!! hello, there!! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today?',
    };
    const maxLengthKey = deterministicPartitionKey(testEvent);
    const maxLengthKeyHash = '33073074c2c1dd8076b77289b64c1009fc8069e3093aad02c2baec835407d6c3252191aeb142177fcf16cec8683aeee637ba95dd85d693e143a14b80c95f5355';
    expect(maxLengthKey).toBe(maxLengthKeyHash);
  });

  // check candidate length > MAX_PART...
  it("Returns over-max-length-key hash when given event with over-max-length paritionKey attribute", () => {
    const testEvent = {
      paritionKey: 'well, hello, hello, there!! hello, there!! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today? hello, there! how are you doing today?',
    };
    const overMaxLengthKey = deterministicPartitionKey(testEvent);
    const overMaxLengthKeyHash = 'f46fd42f49174edbc6b11ab8f558ad36ab9a7cfa895cf849339209d2d141592c628af8e7b4ae6e6273e51897bad917fafb7499ae5e0853a0816e4c1db8b0aec7';
    expect(overMaxLengthKey).toBe(overMaxLengthKeyHash);
  });

});







// check candidate a string (redundant with check event with partition key)

// check no candidate (redundant with check even with/without partitionkey)

// check candidate length < MAX_PART... (redundant with check event with partitino key)

// check candidate length = MAX_PART...

// check candidate length > MAX_PART...
