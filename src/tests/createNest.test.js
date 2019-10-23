const testOrder = [
    { dataType: 'start', payload: { name: 'EBML' } },
    { dataType: 'tag', payload: { name: 'EBMLVersion', data: 1 } },
    { dataType: 'tag', payload: { name: 'EBMLSize', data: 4 } },
    { dataType: 'end', payload: { name: 'EBML' } },
    { dataType: 'start', payload: { name: 'SeekHead' } },
    { dataType: 'start', payload: { name: 'Seek' } },
    { dataType: 'tag', payload: { name: 'SeekID', data: 0xfface0 } },
    { dataType: 'end', payload: { name: 'Seek' } },
    { dataType: 'start', payload: { name: 'Seek' } },
    { dataType: 'tag', payload: { name: 'SeekID', data: 0xfface1 } },
    { dataType: 'end', payload: { name: 'Seek' } },
    { dataType: 'start', payload: { name: 'Seek' } },
    { dataType: 'tag', payload: { name: 'SeekID', data: 0xfface2 } },
    { dataType: 'end', payload: { name: 'Seek' } },
    { dataType: 'end', payload: { name: 'SeekHead' } }
]
test('simple webM parsing', () => {
    const output = JSON.stringify(
        testOrder.reduce((result, entry) => {
            if (entry.dataType === 'start') {
                // <detail><summary>{entry.payload.name}</summary>...
            }
            if (entry.dataType === 'tag') {
                // <div><span>{entry.payload.name}:</span><span>{getWebMData(entry.payload)}</span></div> 
            }
            if (entry.dataType === 'end') {
                // ...</detail>
            }
            return result;
        }, { currentTag: [] })
    );
    expect(output).toBeTruthy;
})
