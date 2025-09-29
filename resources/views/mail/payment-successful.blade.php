<x-mail::message>
# Pagamento realizado com sucesso

Obrigado por confiar no nosso sistema.

**Sumário**

<x-mail::table>
| Nome               | Preço                           | Quantidade                      | Total                                                     |
| :----------------- | :------------------------------ | :-----------------------------: | --------------------------------------------------------: |
@foreach ($cart->products as $product)
| {{ $product->name }} | R$ @currency($product->price) | {{ $product->pivot->quantity }} | R$ @currency($product->price * $product->pivot->quantity) |
@endforeach
</x-mail::table>

@if ($receiptUrl)
<x-mail::button :url="$receiptUrl">
Recibo
</x-mail::button>
@endif

Obrigado,<br>
{{ config('app.name') }}
</x-mail::message>
