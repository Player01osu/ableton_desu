
function queue_new() {
    var queue = {
        elements: {},
        head: 0,
        tail: 0
    };
    return queue;
}

function queue_enqueue(queue, element) {
    queue.elements[queue.tail] = element;
    queue.tail++;
}

function queue_dequeue(queue) {
    var element = queue.elements[queue.head];
    delete queue.elements[queue.head];
    queue.head++;
    return element;
}

function queue_length(queue) {
    return queue.tail - queue.head;
}

function queue_is_empty(queue) {
    return queue_length(queue) === 0;
}

function queue_for_each(queue, callback) {
    for (var i = queue.head; i < queue.tail; ++i) {
        callback(queue.elements[i]);
    }
}

// vim:expandtab:softtabstop=4:tabstop=4:shiftwidth=4
